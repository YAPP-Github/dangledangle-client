'use client';
import React, { CSSProperties, useCallback } from 'react';
import * as styles from './ChipInput.css';
import Chip from './Chip';
import clsx from 'clsx';

export type ChipOption = {
  value: string;
  label: string;
};
interface ChipInputProps {
  name: string;
  value: string;
  options: ChipOption[] | string[];
  onChange: (name: string, value: string) => void;
  style?: CSSProperties;
  className?: string;
}

const ChipInput: React.FC<ChipInputProps> = ({
  options,
  onChange,
  name,
  value,
  style,
  className
}) => {
  const getOptionValue = useCallback((option: (typeof options)[0]) => {
    return typeof option === 'string' ? option : option.value;
  }, []);

  const getOptionLabel = useCallback((option: (typeof options)[0]) => {
    return typeof option === 'string' ? option : option.label;
  }, []);

  const handleClickChip = useCallback(
    (option: string | ChipOption) => () => {
      onChange(name, getOptionValue(option));
    },
    [getOptionValue, name, onChange]
  );

  return (
    <ul className={clsx(styles.container, className)} style={style}>
      {options.map(option => {
        return (
          <Chip
            label={getOptionLabel(option)}
            key={getOptionValue(option)}
            checked={value === getOptionValue(option)}
            onClick={handleClickChip(option)}
          />
        );
      })}
    </ul>
  );
};

export default ChipInput;
