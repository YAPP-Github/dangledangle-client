import { RegisterOptions, useFormContext } from 'react-hook-form';
import TextArea, { TextAreaProps } from './TextArea';
import useTextFieldFormAdaptor from '../TextField/hooks/useTextFieldFormAdaptor';

interface AddRegisterOptions {
  registerOptions?: RegisterOptions;
}
function TextAreaWithForm({ ...props }: TextAreaProps & AddRegisterOptions) {
  const methods = useFormContext();

  const { handleError, onChange } = useTextFieldFormAdaptor(methods);

  const thisFieldError = methods.formState.errors?.[props.name];

  if (thisFieldError) {
    props.status = 'error';
    props.message = String(thisFieldError.message) || '';
  }
  return (
    <TextArea
      {...props}
      {...methods.register(props.name, { ...props.registerOptions })}
      onChange={onChange(props.name)}
      handleError={handleError}
    />
  );
}

export default TextAreaWithForm;
