import React, {
  ChangeEventHandler,
  FC,
  HTMLProps,
  useEffect,
  useRef,
  useState
} from 'react';
import { FieldProps, splitFormProps, useField } from 'react-form';

export const SelectInputField: FC<
  FieldProps & HTMLProps<HTMLSelectElement> & { options: string[] }
> = props => {
  const [field, fieldOptions, { options, ...rest }] = splitFormProps(props);

  const newGroupInputRef = useRef<HTMLInputElement | null>(null);

  const {
    value = '',
    setValue,
    meta: { error, isTouched, isValidating }
  } = useField(field, fieldOptions);

  const [inputValue, setInputValue] = useState('');

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setValue(e.target.value);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value === '') {
      setInputValue('');
    }
  }, [value]);

  useEffect(() => {
    if (value !== '' && !options.includes(value) && newGroupInputRef.current) {
      newGroupInputRef.current.focus();
    }
  }, [options, value]);

  const showInput = !options.includes(value) || inputValue !== '';

  return (
    <>
      <select id={field} value={value} onChange={handleSelectChange} {...rest}>
        <option>Create New</option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {showInput && (
        <input
          type="text"
          aria-label="New group name"
          value={inputValue}
          onChange={handleInputChange}
          ref={newGroupInputRef}
        />
      )}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
};
