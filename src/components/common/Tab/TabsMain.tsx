import { createContext, useCallback, useContext, useState } from 'react';

interface TabContextProps {
  selectedTab: number;
  handleTabSelect: (index: number) => void;
}

interface TabsProps {
  defaultValue: number;
  children: React.ReactNode;
}

const TabContext = createContext<TabContextProps | null>(null);

const TabsMain = ({ defaultValue, children }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const handleTabSelect = useCallback((index: number) => {
    setSelectedTab(index);
  }, []);

  const providerValue = { selectedTab, handleTabSelect };

  return (
    <TabContext.Provider value={providerValue}>{children}</TabContext.Provider>
  );
};

export const useTabContext = () => {
  const ctx = useContext(TabContext);
  if (ctx === undefined) {
    throw new Error('useTabContext must be used within a <Tabs />');
  }
  return ctx;
};

export default TabsMain;
