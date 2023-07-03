import { TabPanel, Tab, TabList, Tabs } from '@/components/common/Tab';

interface Props {}

export default function TabExamplePage({}: Props) {
  return (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab value={0} title="0번째"></Tab>
        <Tab value={1} title="1번째"></Tab>
        <Tab value={2} title="2번째"></Tab>
      </TabList>

      <TabPanel value={0}>
        <div>종이0</div>
      </TabPanel>
      <TabPanel value={1}>
        <div>종이1</div>
      </TabPanel>
      <TabPanel value={2}>
        <div>종이2</div>
      </TabPanel>
    </Tabs>
  );
}
