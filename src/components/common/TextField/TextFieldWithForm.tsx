import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from './TextField';

interface AddRegisterOptions {
  registerOptions?: RegisterOptions;
}
function TextFieldWithForm({ ...props }: TextFieldProps & AddRegisterOptions) {
  const methods = useFormContext();

  return (
    <TextField
      {...props}
      {...methods.register(props.name, { ...props.registerOptions })}
      error={methods.formState.errors[props.name]}
    />
  );
}

export default TextFieldWithForm;
