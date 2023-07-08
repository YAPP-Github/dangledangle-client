'use client';
import Tabs from '@/components/common/Tab';
import MapExample from '@/components/global/Map/MapExample';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';
import { animalsMock } from '@/types/shelter';
import Calendar from '../Calendar/Calendar';

export default function TabExamplePage() {
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
      <Tabs.TabPanel value={1} size="fullWidth">
        <MapExample />
      </Tabs.TabPanel>
      <Tabs.TabPanel value={2} size="fullWidth">
        {animalsMock.map(animal => (
          <div style={{ padding: 10 }} key={animal.id}>
            <AnimalCard
              data={animal}
              onClickEdit={() => null}
              onClickDelete={() => null}
            />
          </div>
        ))}
      </Tabs.TabPanel>
    </Tabs>
  );
}
