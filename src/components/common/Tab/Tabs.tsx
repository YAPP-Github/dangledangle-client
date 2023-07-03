import { createContext, useContext, useState } from 'react';

interface TabContextProps {
  selectedTab: number;
  handleTabSelect: (index: number) => void;
}

interface TabsProps {
  defaultValue: number;
  children: React.ReactNode;
}

const TabContext = createContext<TabContextProps | null>(null);

const Tabs = ({ defaultValue, children }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const handleTabSelect = (index: number) => {
    setSelectedTab(index);
  };

  const providerValue = { selectedTab, handleTabSelect };

  return (
    <TabContext.Provider value={providerValue}>{children}</TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};

export default Tabs;
