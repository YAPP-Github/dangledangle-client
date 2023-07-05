'use client';
import Tabs from '@/components/common/Tab';
import Calendar from '../Calendar/Calendar';

interface Props {}

export default function TabExamplePage({}: Props) {
  return (
    <Tabs defaultValue={0}>
      <Tabs.TabList>
        <Tabs.Tab value={0} title="봉사 모집 일정"></Tabs.Tab>
        <Tabs.Tab value={1} title="안내 및 상세 정보"></Tabs.Tab>
        <Tabs.Tab value={2} title="특별 케어 동물"></Tabs.Tab>
      </Tabs.TabList>

      <Tabs.TabPanel value={0}>
        <Calendar />
      </Tabs.TabPanel>
      <Tabs.TabPanel value={1}>
        <div>안내 및 상세 정보</div>
      </Tabs.TabPanel>
      <Tabs.TabPanel value={2}>
        <div>특별 케어 동물</div>
      </Tabs.TabPanel>
    </Tabs>
  );
}
