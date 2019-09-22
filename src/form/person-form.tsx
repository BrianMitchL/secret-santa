import React, {
  FC,
  RefForwardingComponent,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { useForm, useField, splitFormProps } from 'react-form';
import './form.css';
import { Person } from 'gift-exchange';

const InputField: RefForwardingComponent<
  HTMLInputElement,
  any
> = React.forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);

  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  return (
    <>
      <input id={field} {...getInputProps({ ref, ...rest })} />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

type FormValues = {
  name: string;
  group: string;
};

const defaultValues: FormValues = {
  name: '',
  group: ''
};

interface Props {
  people: Person[];
  onSubmit: (person: Person) => void;
}

export const PersonForm: FC<Props> = ({ people, onSubmit }) => {
  const usedNames = useMemo(() => people.map(p => p.name), [people]);
  const nameInput = useRef<null | HTMLInputElement>(null);

  const validateName = (value: string) =>
    value && !usedNames.includes(value) ? null : 'A unique name is required';

  const {
    Form,
    meta: { canSubmit, isTouched, isSubmitted }
  } = useForm({
    defaultValues,
    onSubmit: (values: FormValues, instance: { reset: () => void }) => {
      onSubmit({
        name: values.name,
        ...(values.group && { group: values.group })
      });

      instance.reset();
    },
    validate: (values: FormValues) => validateName(values.name)
  });

  useEffect(() => {
    if (nameInput.current && isSubmitted && !isTouched) {
      nameInput.current.focus();
    }
  }, [isSubmitted, isTouched]);

  return (
    <Form>
      <fieldset>
        <legend>Add a New Person</legend>
        <label htmlFor="name">Name</label>
        <InputField
          field="name"
          validate={validateName}
          ref={nameInput}
          type="text"
          required
        />
        <label htmlFor="group">Group</label>
        <InputField field="group" type="text" />
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </fieldset>
    </Form>
  );
};
