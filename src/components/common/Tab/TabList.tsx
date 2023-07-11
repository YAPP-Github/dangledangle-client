import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './Tab.css';
import { palette } from '@/styles/color';
import { useTabContext } from './TabsMain';
import clsx from 'clsx';
interface TabListProps {
  color?: string;
  children?: React.ReactNode;
}

const TabList = ({ color = palette.white, children }: TabListProps) => {
  const ctx = useTabContext();

  return (
    <>
      <ul
        className={clsx(styles.tabList, styles.sticky)}
        style={assignInlineVars({
          [styles.tabColor]: color
        })}
      >
        {children}
        <div
          className={styles.selectedLine}
          style={assignInlineVars({
            [styles.tabX]: `${(ctx?.selectedTab ?? 0) * 100}%`
          })}
        ></div>
      </ul>
    </>
  );
};

export default TabList;
