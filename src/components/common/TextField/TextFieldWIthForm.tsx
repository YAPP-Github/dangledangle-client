import { RegisterOptions, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from './TextField';
import useTextFieldFormAdaptor from './hooks/useTextFieldFormAdaptor';
import { useEffect, useState } from 'react';
import { TextFieldStatus } from './hooks/useTextFieldStatus';

interface AddRegisterOptions {
  registerOptions?: RegisterOptions;
}
function TextFieldWithForm({ ...props }: TextFieldProps & AddRegisterOptions) {
  const methods = useFormContext();
  const [status, setStatus] = useState<{
    status: TextFieldStatus;
    message: string;
  }>({
    status: props.status || 'default',
    message: props.message || ''
  });
  const thisFieldError = methods.formState.errors?.[props.name];
  const { handleError, onChange } = useTextFieldFormAdaptor(methods);

  useEffect(() => {
    if (thisFieldError) {
      setStatus(prev => {
        console.log('prev', prev);
        return {
          status: 'error',
          message: String(thisFieldError.message) || ''
        };
      });
    } else {
      setStatus({
        status: 'active',
        message: ''
      });
    }
  }, [thisFieldError]);

  useEffect(() => {
    if (props.status) {
      setStatus({
        status: props.status,
        message: props.message || ''
      });
    }
  }, [props.status]);

  return (
    <TextField
      {...props}
      {...status}
      {...methods.register(props.name, { ...props.registerOptions })}
      onChange={onChange(props.name)}
      handleError={handleError}
    />
  );
}

export default TextFieldWithForm;
