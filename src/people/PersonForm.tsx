import { SubmitHandler, useForm } from 'react-hook-form';
import '../common/form.css';
import { Person } from 'gift-exchange';
import { ErrorMessage } from '@hookform/error-message';
import { ValidationError } from '../common/ValidationError';

type FormValues = {
  ['person-name']: string;
  ['person-group']: string;
};

interface Props {
  usedNames: string[];
  usedGroups: string[];
  onSubmit: (person: Person) => void;
}

export const PersonForm = ({ usedNames, usedGroups, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit({
      name: data['person-name'],
      group: data['person-group'] === '' ? undefined : data['person-group'],
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <fieldset>
        <legend>Add a New Person</legend>
        <label htmlFor="person-name" className="label-required">
          Name
        </label>
        <input
          id="person-name"
          {...register('person-name', {
            required: 'A name is required',
            validate: (value) =>
              (value && !usedNames.includes(value)) ||
              'The name must be unique',
          })}
          type="text"
          aria-required
          aria-invalid={errors['person-name'] ? 'true' : 'false'}
        />
        <ErrorMessage errors={errors} name="person-name" as={ValidationError} />

        <label htmlFor="person-group">Group</label>
        <input
          id="person-group"
          {...register('person-group')}
          type="text"
          list="groupOptions"
          autoComplete="off"
        />
        <datalist id="groupOptions">
          {usedGroups.map((group) => (
            <option key={group}>{group}</option>
          ))}
        </datalist>
        <p className="meta">
          Use groups for simple exclusions to prevent people in the same group
          from matching with each other. For example, people in the same family
          or household.
        </p>
        <button type="submit">Add Person</button>
      </fieldset>
    </form>
  );
};
