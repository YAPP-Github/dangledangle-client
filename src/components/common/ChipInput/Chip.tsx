import { Caption1 } from '../Typography';
import * as styles from './Chip.css';
interface ChipProps {
  checked: boolean;
  children: string;
  onClick: (label: string) => void;
}

const Chip: React.FC<ChipProps> = ({ checked, children, onClick }) => {
  return (
    <li
      className={checked ? styles.checked : styles.base}
      onClick={() => onClick(children)}
    >
      <Caption1 color={checked ? 'white' : 'gray600'}>{children}</Caption1>
    </li>
  );
};

export default Chip;
