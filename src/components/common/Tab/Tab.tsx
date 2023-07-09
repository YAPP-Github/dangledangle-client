import { Body3, Body4 } from '../Typography';
import * as styles from './Tab.css';
import { useTabContext } from './TabsMain';
interface TabProps {
  value: number;
  title: string;
}

export default function Tab({ value, title }: TabProps) {
  const ctx = useTabContext();
  const isActive = ctx?.selectedTab === value;

  return (
    <div className={styles.tabBox}>
      <li onClick={() => ctx?.handleTabSelect(value)}>
        {isActive ? (
          <Body4 color="gray900" className={styles.tabText}>
            {title}
          </Body4>
        ) : (
          <Body3 color="gray400" className={styles.tabText}>
            {title}
          </Body3>
        )}
      </li>
    </div>
  );
}
