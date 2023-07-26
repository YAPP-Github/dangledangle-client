import BottomSheet from '../BottomSheet/BottomSheet';
import { Body3, Body4 } from '../Typography';
import { FilterOption } from './Filter';
import * as styles from './FilterBottom.css';

interface FilterBottomProps {
  open: boolean;
  onClose: VoidFunction;
  label: string;
  options: FilterOption[];
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
  return (
    <BottomSheet isOpened={open} onClose={onClose} className={styles.sheet}>
      <section className={styles.sheetContainer}>
        <Body3 className={styles.title}>{label}</Body3>
        <ul>
          {options?.map(({ label, value }) => (
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
          ))}
        </ul>
      </section>
    </BottomSheet>
  );
}
