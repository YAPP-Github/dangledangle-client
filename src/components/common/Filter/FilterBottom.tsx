import { useCallback } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { Body3, Body4 } from '../Typography';
import { FilterOption } from './Filter';
import * as styles from './FilterBottom.css';

interface FilterBottomProps {
  open: boolean;
  onClose: VoidFunction;
  label: string;
  options: FilterOption[] | readonly string[];
  pickOption: string;
  onClick: (label: string, value: string) => void;
}

export default function FilterBottom({
  open,
  onClose,
  label,
  options,
  pickOption,
  onClick
}: FilterBottomProps) {
  const getOptionValueLabel = useCallback((option: (typeof options)[0]) => {
    return {
      value: typeof option === 'string' ? option : option.value,
      label: typeof option === 'string' ? option : option.label
    };
  }, []);

  return (
    <BottomSheet isOpened={open} onClose={onClose} className={styles.sheet}>
      <section className={styles.sheetContainer}>
        <Body3 className={styles.title}>{label}</Body3>
        <ul>
          {options?.map(option => {
            const { value, label } = getOptionValueLabel(option);
            return (
              <li
                key={value}
                className={styles.label}
                onClick={() => onClick(label, value)}
              >
                <Body4
                  className={styles.labelTxt({
                    color: label === pickOption ? 'pick' : 'other'
                  })}
                >
                  {label}
                </Body4>
              </li>
            );
          })}
        </ul>
      </section>
    </BottomSheet>
  );
}
