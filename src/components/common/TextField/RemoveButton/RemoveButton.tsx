import { TextFieldRemoveIcon } from '@/asset/icons';
import clsx from 'clsx';
import * as styles from './RemoveButton.css';
import { MouseEventHandler, useCallback } from 'react';
interface RemoveButtonProps {
  visible: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ visible, onClick }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      onClick(e);
    },
    [onClick]
  );

  return (
    <button
      onClick={handleClick}
      className={clsx(styles.icon({ visible }))}
      type="button"
      tabIndex={-1}
    >
      <TextFieldRemoveIcon />
    </button>
  );
};

export default RemoveButton;
