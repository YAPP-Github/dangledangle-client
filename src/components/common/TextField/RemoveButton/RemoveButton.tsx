import { TextFieldRemoveIcon } from '@/asset/icons';
import clsx from 'clsx';
import * as style from './RemoveButton.css';

interface RemoveButtonProps {
  visible: boolean;
  onClick: () => void;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ visible, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(style.icon({ visible }))}>
      <TextFieldRemoveIcon />
    </button>
  );
};

export default RemoveButton;
