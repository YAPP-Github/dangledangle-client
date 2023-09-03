import { CSSProperties, ReactNode } from 'react';
import {
  FormProvider as ReactHookFormProvider,
  UseFormReturn
} from 'react-hook-form';

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  style
}: Props) {
  return (
    <ReactHookFormProvider {...methods}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit!();
        }}
        style={style}
      >
        {children}
      </form>
    </ReactHookFormProvider>
  );
}
