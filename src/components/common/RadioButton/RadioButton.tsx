import React, { ChangeEventHandler, useState } from 'react';
import * as styles from './RadioButton.css';
import { ButtonText1, Caption1 } from '../Typography';
import clsx from 'clsx';

export type RadioOption = {
  label: string;
  value: string;
};

interface RadioButtonProps {
  className?: string;
  initailValue?: string;
  style?: React.CSSProperties;
  label?: string;
  name: string;
  options: RadioOption[];
  onChange: ChangeEventHandler;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className, style, label, name, options, onChange, initailValue }, ref) => {
    const [selectedValue, setSelectedValue] = useState(initailValue || '');

    const handleLaebelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target?.value);
      onChange(e);
    };

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
            <label
              key={index}
              htmlFor={option.value}
              className={styles.radioWrapper}
            >
              <input
                ref={ref}
                className={styles.radio}
                type="radio"
                id={option.value}
                name={name}
                value={option.value}
                onChange={handleLaebelChange}
              />
              <ButtonText1
                className={clsx(
                  styles.label({
                    check: selectedValue === option.value ? true : false
                  })
                )}
              >
                {option.label}
              </ButtonText1>
            </label>
          ))}
        </div>
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
