import React, { HTMLProps, RefForwardingComponent } from 'react';
import { FieldProps, splitFormProps, useField } from 'react-form';

export const InputField: RefForwardingComponent<
  HTMLInputElement,
  FieldProps & HTMLProps<HTMLInputElement>
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
