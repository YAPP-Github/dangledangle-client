import TabsMain from './TabsMain';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';

const Tabs = Object.assign(TabsMain, {
  TabList,
  Tab,
  TabPanel
});

export default Tabs;
export { TabsMain, TabList, Tab, TabPanel };
