import React, { FC, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-form';
import './form.css';
import { Person } from 'gift-exchange';
import { InputField } from './input-field';
import { SelectInputField } from './select-input-field';

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

const isString = (str: unknown): str is string => typeof str === 'string';

export const PersonForm: FC<Props> = ({ people, onSubmit }) => {
  const usedNames = useMemo(() => people.map(p => p.name), [people]);
  const usedGroups = useMemo(
    () => [...new Set(people.map(p => p.group).filter(isString))],
    [people]
  );
  const nameInput = useRef<null | HTMLInputElement>(null);

  const validateName = (value: string) =>
    value && !usedNames.includes(value) ? false : 'A unique name is required';

  const instance = useForm<FormValues>({
    defaultValues,
    onSubmit: (values, instance) => {
      onSubmit({
        name: values.name,
        ...(values.group && { group: values.group })
      });

      instance.reset();
    },
    debugForm: true
  });

  const {
    Form,
    meta: { canSubmit, isTouched, isSubmitted },
    getFieldMeta
  } = instance;

  useEffect(() => {
    if (nameInput.current && isSubmitted && !isTouched) {
      nameInput.current.focus();
    }
  }, [isSubmitted, isTouched]);

  const nameField = getFieldMeta('name');

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
        <SelectInputField field="group" options={usedGroups} />
        <button
          type="submit"
          disabled={!canSubmit || (nameField && !nameField.isTouched)}
        >
          Submit
        </button>
      </fieldset>
    </Form>
  );
};
