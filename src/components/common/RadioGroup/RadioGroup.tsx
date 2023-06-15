import React, { ChangeEventHandler } from 'react';
import * as styles from './RadioGroup.css';
import { Body1 } from '../Typography';

export type RadioOption = {
  label: string;
  value: string;
};

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  onChange: ChangeEventHandler;
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ name, options, onChange }, ref) => {
    return (
      <div className={styles.container}>
        {options.map((option, index) => (
          <Body1 key={index} element={'label'} className={styles.label}>
            <input
              ref={ref}
              className={styles.radio}
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              onChange={onChange}
            />
            {option.label}
          </Body1>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
