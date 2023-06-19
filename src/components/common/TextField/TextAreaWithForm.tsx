import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import TextArea, { TextAreaProps } from './TextArea';

interface AddRegisterOptions {
  registerOptions?: RegisterOptions;
}
function TextAreaWithForm({ ...props }: TextAreaProps & AddRegisterOptions) {
  const methods = useFormContext();

  return (
    <TextArea
      {...props}
      {...methods.register(props.name, { ...props.registerOptions })}
      error={methods.formState.errors[props.name]}
    />
  );
}

export default TextAreaWithForm;
