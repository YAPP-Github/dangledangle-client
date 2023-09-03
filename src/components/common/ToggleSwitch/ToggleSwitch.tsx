'use client';
import React, { useCallback } from 'react';
import { Caption3 } from '../Typography';
import * as styles from './ToggleSwitch.css';

interface ToggleSwitchProps {
  /** input name */
  name: string;
  /** input Change */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** input id */
  id?: string;
  /** labelText */
  label?: string;
  /** Is the toggle switch disabled */
  disabled?: boolean;
  /** checked 속성 */
  checked?: boolean;
}

export const ToggleSwitch = React.forwardRef<
  HTMLInputElement,
  ToggleSwitchProps
>(({ name, onChange, id, label, disabled, checked, ...rest }, ref) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <fieldset className={styles.wrapper}>
      <input
        className={styles.toggle}
        name={name}
        ref={ref}
        onChange={handleChange}
        checked={checked || false}
        role="switch"
        type="checkbox"
        id={id || name}
        disabled={disabled}
        {...rest}
      />
      {label && <Caption3 htmlFor={id || name}>{label}</Caption3>}
    </fieldset>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';
export default ToggleSwitch;
