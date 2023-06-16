import { RegisterOptions, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from './TextField';
import useTextFieldFormAdaptor from './hooks/useTextFieldFormAdaptor';

interface AddRegisterOptions {
  registerOptions?: RegisterOptions;
}
function TextFieldWithForm({ ...props }: TextFieldProps & AddRegisterOptions) {
  const methods = useFormContext();

  const { handleError, onChange } = useTextFieldFormAdaptor(methods);

  const thisFieldError = methods.formState.errors?.[props.name];

  if (thisFieldError) {
    props.status = 'error';
    props.message = String(thisFieldError.message) || '';
  }

  return (
    <TextField
      {...props}
      {...methods.register(props.name, { ...props.registerOptions })}
      onChange={onChange(props.name)}
      handleError={handleError}
    />
  );
}

export default TextFieldWithForm;
