import clsx from 'clsx';
import * as styles from './Tab.css';
import { useTabContext } from './TabsMain';

interface PanelProps {
  value: number | string;
  children: React.ReactNode;
}

const TabPanel = ({ value, children }: PanelProps) => {
  const ctx = useTabContext();

  return (
    <main
      className={clsx([
        styles.panel({ visible: ctx?.selectedTab === value ? true : false })
      ])}
    >
      {children}
    </main>
  );
};

export default TabPanel;
