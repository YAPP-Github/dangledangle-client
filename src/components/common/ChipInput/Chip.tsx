import { Caption3 } from '../Typography';
import * as styles from './Chip.css';
interface ChipProps {
  checked: boolean;
  label: string;
  onClick: (label: string) => void;
}

const Chip: React.FC<ChipProps> = ({ checked, label, onClick }) => {
  return (
    <li
      className={checked ? styles.checked : styles.base}
      onClick={() => onClick(label)}
    >
      <Caption3 color={checked ? 'white' : 'gray600'}>{label}</Caption3>
    </li>
  );
};

export default Chip;
