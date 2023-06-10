import * as styles from './CheckBox.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Color, palette } from '@/styles/color';
import { useCallback } from 'react';
import { Body1 } from '../typography';
import { CheckIcon } from '@/asset/icons';

interface CheckBoxProps {
  name?: string;
  value: boolean;
  disabled?: boolean;
  color?: Color;
  label?: string;
  onClick: (value: boolean, name?: string) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  value,
  disabled,
  color = 'primary300',
  label,
  onClick
}) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick(!value, name);
  }, [disabled, name, onClick, value]);

  return (
    <div className={styles.container}>
      <button
        className={styles.checkBox({
          checked: value,
          disabled: disabled
        })}
        style={assignInlineVars({ [styles.checkBoxColor]: palette[color] })}
        type="button"
        onClick={handleClick}
      >
        <CheckIcon alt="close" />
      </button>
      {label && <Body1 className={styles.label}>{label}</Body1>}
    </div>
  );
};

export default CheckBox;
