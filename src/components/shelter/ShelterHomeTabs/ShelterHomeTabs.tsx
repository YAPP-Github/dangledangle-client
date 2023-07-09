'use client';
import Tabs from '@/components/common/Tab';
import { ShelterHomeTabRenderInfo } from '@/types/shelter';

interface ShelterTabsProps {
  tabList: ShelterHomeTabRenderInfo[];
}

export default function ShelterHomeTabs({ tabList }: ShelterTabsProps) {
  return (
    <Tabs defaultValue={0}>
      <Tabs.TabList>
        {tabList.map((tabInfo, i) => (
          <Tabs.Tab key={`shelterTab_${i}`} value={i} title={tabInfo.title} />
        ))}
      </Tabs.TabList>

      <section area-label="shelter_home_panels">
        {tabList.map((tabInfo, i) => (
          <Tabs.TabPanel key={`shelterTabPanel_${i}`} value={i}>
            <tabInfo.PanelComp />
          </Tabs.TabPanel>
        ))}
      </section>
    </Tabs>
  );
}
