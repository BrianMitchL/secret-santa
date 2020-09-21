import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../form/form.css';
import { Person } from 'gift-exchange';
import { ErrorMessage } from '@hookform/error-message';
import { ValidationError } from '../form/ValidationError';

type FormValues = {
  name: string;
  group: string;
};

interface Props {
  usedNames: string[];
  usedGroups: string[];
  onSubmit: (person: Person) => void;
}

export const PersonForm = ({ usedNames, usedGroups, onSubmit }: Props) => {
  const { errors, handleSubmit, register, reset } = useForm();
  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit({
      name: data.name,
      group: data.group === '' ? undefined : data.group,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <fieldset>
        <legend>Add a New Person</legend>
        <label htmlFor="name" className="label-required">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          ref={register({
            required: 'A name is required',
            validate: (value) =>
              (value && !usedNames.includes(value)) ||
              'The name must be unique',
          })}
        />
        <ErrorMessage errors={errors} name="name" as={ValidationError} />

        <label htmlFor="group">Group</label>
        <input
          id="group"
          name="group"
          type="text"
          list="groupOptions"
          autoComplete="off"
          ref={register}
        />
        <datalist id="groupOptions">
          {usedGroups.map((group) => (
            <option key={group}>{group}</option>
          ))}
        </datalist>
        <p className="meta">
          Use groups for simple exclusions to prevent people in the same group
          from matching with each other.
        </p>
        <button type="submit">Add Person</button>
      </fieldset>
    </form>
  );
};
