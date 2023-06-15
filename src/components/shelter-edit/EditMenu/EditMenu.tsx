import { ArrowDownIcon } from '@/asset/icons';
import { Caption2, H4 } from '@/components/common/Typography';
import * as styles from './EditMenu.css';

interface EditMenuProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  titleSuffix?: React.ReactNode;
  caption: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const EditMenu: React.FC<EditMenuProps> = ({
  title,
  titleSuffix,
  caption,
  className,
  style,
  onClick
}) => {
  return (
    <li
      className={className}
      style={{ ...style, cursor: onClick ? 'pointer' : 'unset' }}
      onClick={onClick}
    >
      <a className={styles.container}>
        <div>
          <div className={styles.titleWrapper}>
            <H4>{title}</H4>
            {titleSuffix}
          </div>
          <Caption2 element="label" color="gray600">
            {caption}
          </Caption2>
        </div>
        {onClick && <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} />}
      </a>
    </li>
  );
};

export default EditMenu;
