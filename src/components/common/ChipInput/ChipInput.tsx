'use client';
import React, { CSSProperties, useCallback } from 'react';
import * as styles from './ChipInput.css';
import Chip from './Chip';

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
}

const ChipInput: React.FC<ChipInputProps> = ({
  options,
  onChange,
  name,
  value,
  style
}) => {
  const getOptionValue = useCallback((option: (typeof options)[0]) => {
    return typeof option === 'string' ? option : option.value;
  }, []);

  const getOptionLabel = useCallback((option: (typeof options)[0]) => {
    return typeof option === 'string' ? option : option.label;
  }, []);

  const handleClickChip = useCallback(
    (option: string | ChipOption) => {
      onChange(name, getOptionValue(option));
    },
    [getOptionValue, name, onChange]
  );

  return (
    <ul className={styles.container} style={style}>
      {options.map(option => {
        return (
          <Chip
            key={getOptionValue(option)}
            checked={value === getOptionValue(option)}
            onClick={() => handleClickChip(option)}
          >
            {getOptionLabel(option)}
          </Chip>
        );
      })}
    </ul>
  );
};

export default ChipInput;
