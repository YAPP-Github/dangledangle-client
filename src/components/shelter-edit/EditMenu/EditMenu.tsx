import { ArrowDownIcon } from '@/asset/icons';
import { Caption2, H4 } from '@/components/common/Typography';
import * as styles from './EditMenu.css';
import Divider from '@/components/common/Divider/Divider';

interface EditMenuProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  titleSuffix?: React.ReactNode;
  caption: string;
}

const EditMenu: React.FC<EditMenuProps> = ({
  title,
  titleSuffix,
  caption,
  className,
  style
}) => {
  return (
    <li className={className} style={style}>
      <div className={styles.container}>
        <div>
          <div className={styles.titleWrapper}>
            <H4>{title}</H4>
            {titleSuffix}
          </div>
          <Caption2 element="label" color="gray600">
            {caption}
          </Caption2>
        </div>
        <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} />
      </div>
    </li>
  );
};

export default EditMenu;
