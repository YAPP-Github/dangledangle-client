import React, { ChangeEventHandler } from 'react';
import * as styles from './RadioGroup.css';
import { Body1, Caption1 } from '../Typography';

export type RadioOption = {
  label: string;
  value: string;
};

interface RadioGroupProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  name: string;
  options: RadioOption[];
  onChange: ChangeEventHandler;
}

const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ className, style, label, name, options, onChange }, ref) => {
    return (
      <div className={className} style={style}>
        {label && (
          <Caption1
            element={'label'}
            color="gray600"
            style={{ display: 'block', marginBottom: '6px' }}
          >
            {label}
          </Caption1>
        )}
        <div className={styles.container}>
          {options.map((option, index) => (
            <div key={index} className={styles.radioWrapper}>
              <input
                ref={ref}
                className={styles.radio}
                type="radio"
                id={option.value}
                name={name}
                value={option.value}
                onChange={onChange}
              />
              <Body1
                element={'label'}
                className={styles.label}
                htmlFor={option.value}
              >
                {option.label}
              </Body1>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
