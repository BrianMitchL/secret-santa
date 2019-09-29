/// <reference types="react-scripts" />

declare module 'react-form' {
  import {
    ChangeEventHandler,
    ComponentType,
    Dispatch,
    FocusEventHandler,
    FormEventHandler,
    HTMLProps,
    Provider,
    SetStateAction
  } from 'react';

  type Debounce = (fn: (...args: any[]) => any, wait: number) => Promise<any>;
  type ValidatorReturn = string | false | undefined;
  type OptionalPromise<T> = Promise<T> | T;

  interface FormMeta {
    error: string | any;
    isSubmitting: boolean;
    isDirty: boolean;
    isSubmitted: boolean;
    submissionAttempts: number;
    isValid: boolean;
    fieldsAreValidating: boolean;
    fieldsAreValid: boolean;
    canSubmit: boolean;
    [k: string]: any;
  }

  type SetFormMeta = Partial<FormMeta> | ((previousMeta: FormMeta) => FormMeta);

  interface FormInstance<T> {
    Form: ComponentType<Omit<HTMLProps<HTMLFormElement>, 'onSubmit'>>;
    values: T;
    meta: FormMeta;
    formContext: FormInstance<T>;
    reset: () => void;
    setMeta: (value: SetFormMeta) => void;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    debounce: Debounce;
    setValues: Dispatch<SetStateAction<T>>;
    runValidation: () => void;
    getFieldValue: (fieldPath: keyof T | string) => any;
    getFieldMeta: (
      fieldPath: keyof T | string
    ) => { error: string | null; [k: string]: any };
    setFieldValue: <S = any>(
      fieldPath: keyof T | string,
      updater: SetValue<S>,
      options?: { isTouched: boolean }
    ) => void;
    setFieldMeta: (fieldPath: keyof T | string, value: SetFieldMeta) => void;
    pushFieldValue: (fieldPath: keyof T | string, value: any) => void;
    insertFieldValue: (
      fieldPath: keyof T | string,
      insertIndex: number,
      value: any
    ) => void;
    removeFieldValue: (
      fieldPath: keyof T | string,
      removalIndex: number
    ) => void;
    swapFieldValues: (
      fieldPath: keyof T | string,
      firstIndex: number,
      secondIndex: number
    ) => void;
  }

  interface FormOptions<T> {
    defaultValues: T;
    onSubmit: (values: T, instance: FormInstance<T>) => OptionalPromise<void>;
    validate: (
      values: Partial<T>,
      instance: FormInstance<T>
    ) => OptionalPromise<ValidatorReturn>;
    validatePristine?: boolean;
    debugForm: boolean;
  }

  export function useForm<T = {}>(
    options?: Partial<FormOptions<T>>
  ): FormInstance<T>;

  export function useFormContext<T = {}>(): FormInstance<T>;

  interface FieldMeta {
    error: string | any;
    isTouched: boolean;
    [k: string]: any;
  }

  type SetValue<S> = S | ((prevState: S) => S);
  type SetFieldMeta =
    | Partial<FieldMeta>
    | ((previousMeta: FieldMeta) => FieldMeta);

  interface FieldInstance {
    form: FormInstance<any>;
    fieldName: string;
    value: any;
    meta: FieldMeta;
    FieldScope?: ComponentType<Provider<any>>;
    debounce: Debounce;
    runValidation: () => void;
    getInputProps: (
      value: Partial<HTMLProps<HTMLInputElement>>
    ) => {
      value: string | string[] | number;
      onChange: ChangeEventHandler<HTMLInputElement>;
      onBlur: FocusEventHandler<HTMLInputElement>;
    } & Partial<HTMLProps<HTMLInputElement>>;
    setValue: <S = any>(
      updater: SetValue<S>,
      options?: { isTouched: boolean }
    ) => void;
    setMeta: (value: SetFieldMeta) => void;
    pushValue: (value: any) => void;
    insertValue: (insertIndex: number, value: any) => void;
    removeValue: (removalIndex: number) => void;
    swapValues: (firstIndex: number, secondIndex: number) => void;
  }

  interface FieldOptions {
    defaultValue?: any;
    defaultError?: string;
    defaultIsTouched?: boolean;
    defaultMeta?: FieldMeta;
    validate?: (
      values: any,
      instance: FieldInstance
    ) => OptionalPromise<ValidatorReturn>;
    filterValue?: <T extends any>(values: T, instance: FieldInstance) => T;
    validatePristine?: boolean;
  }

  export function useField(
    fieldPath: string,
    options?: FieldOptions
  ): FieldInstance;

  interface FieldOptionProps extends FieldOptions {
    onSubmit?: (
      values: any,
      instance: FormInstance<any>
    ) => OptionalPromise<void>;
    defaultValues?: any;
    debugForm?: boolean;
  }

  export function splitFormProps<P = {}>(
    props: { field: string } & FieldOptionProps & P
  ): [typeof props['field'], FieldOptionProps, P];

  export interface FieldProps extends FieldOptionProps {
    field: string;
  }
}
