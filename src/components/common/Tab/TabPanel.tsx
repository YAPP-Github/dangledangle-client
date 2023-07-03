import { useTabContext } from './Tabs';

interface PanelProps {
  value: number | string;
  children: React.ReactNode;
}

const TabPanel = ({ value, children }: PanelProps) => {
  const ctx = useTabContext();

  return (
    <main
      style={{ display: `${ctx?.selectedTab === value ? 'block' : 'none'}` }}
    >
      {children}
    </main>
  );
};

export default TabPanel;
