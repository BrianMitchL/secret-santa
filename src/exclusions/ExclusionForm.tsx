import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../common/form.css';
import { Exclusion } from 'gift-exchange';
import { exclusionKey } from '../common/utils';
import { ErrorMessage } from '@hookform/error-message';
import { ValidationError } from '../common/ValidationError';

type FormValues = Exclusion;

interface Props {
  usedNames: string[];
  usedGroups: string[];
  usedExclusionKeys: string[];
  onSubmit: (exclusion: Exclusion) => void;
}

export const ExclusionForm = ({
  usedNames,
  usedGroups,
  usedExclusionKeys,
  onSubmit,
}: Props) => {
  const { errors, handleSubmit, register, reset, setError, watch } = useForm();
  const submitHandler: SubmitHandler<FormValues> = (data) => {
    if (usedExclusionKeys.includes(exclusionKey(data))) {
      setError('excludedSubject', { message: 'This exclusion already exists' });
      return;
    }
    onSubmit(data);
    reset();
  };

  const type = watch('type', 'name');
  const excludedType = watch('excludedType', 'name');

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      <p style={{ flex: '1 0 100%' }}>
        A Source will not be matched with the Excluded.
      </p>
      <fieldset style={{ flex: '1 0 auto' }}>
        <legend>Source</legend>
        <label>
          <input
            type="radio"
            name="type"
            value="name"
            defaultChecked
            ref={register({
              required: 'A type is required',
            })}
          />{' '}
          Name
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="group"
            ref={register({
              required: 'A type is required',
            })}
          />{' '}
          Group
        </label>
        <ErrorMessage errors={errors} name="type" as={ValidationError} />

        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          disabled={(type === 'name' ? usedNames : usedGroups).length < 1}
          ref={register({
            required: `A ${type} is required`,
            validate: (value) =>
              type === 'name'
                ? usedNames.includes(value)
                : usedGroups.includes(value),
          })}
        >
          {(type === 'name' ? usedNames : usedGroups).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ErrorMessage errors={errors} name="subject" as={ValidationError} />
      </fieldset>
      <fieldset style={{ flex: '1 0 auto' }}>
        <legend>Excluded</legend>
        <label>
          <input
            type="radio"
            name="excludedType"
            value="name"
            defaultChecked
            ref={register({
              required: 'A type is required',
            })}
          />{' '}
          Name
        </label>
        <label>
          <input
            type="radio"
            name="excludedType"
            value="group"
            ref={register({
              required: 'A type is required',
            })}
          />{' '}
          Group
        </label>
        <ErrorMessage
          errors={errors}
          name="excludedType"
          as={ValidationError}
        />

        <label htmlFor="excludedSubject">Subject</label>
        <select
          id="excludedSubject"
          name="excludedSubject"
          disabled={
            (excludedType === 'name' ? usedNames : usedGroups).length < 1
          }
          ref={register({
            required: `A ${excludedType} is required`,
            validate: (value) =>
              excludedType === 'name'
                ? usedNames.includes(value)
                : usedGroups.includes(value),
          })}
        >
          {(excludedType === 'name' ? usedNames : usedGroups).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name="excludedSubject"
          as={ValidationError}
        />
      </fieldset>
      <div style={{ flex: '0 0 100%' }}>
        <button type="submit">Add Exclusion</button>
      </div>
    </form>
  );
};
