'use client';

import Tabs from './Tabs';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';

const TabsRoot = Object.assign(Tabs, {
  Tab,
  TabList,
  TabPanel: TabPanel
});

export default TabsRoot;
export { Tabs, Tab, TabList, TabPanel };
