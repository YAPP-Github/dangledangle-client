import { TextFieldRemoveIcon } from '@/asset/icons';
import clsx from 'clsx';
import * as styles from './RemoveButton.css';

interface RemoveButtonProps {
  visible: boolean;
  onClick: () => void;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ visible, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(styles.icon({ visible }))}>
      <TextFieldRemoveIcon />
    </button>
  );
};

export default RemoveButton;
