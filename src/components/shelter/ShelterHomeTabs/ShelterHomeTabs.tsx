'use client';
import useShelterHomeInfo from '@/api/shelter/useShelterHomeInfo';
import Calendar from '@/components/common/Calendar/Calendar';
import Tabs from '@/components/common/Tab';
import { useMemo } from 'react';
import SpecialCareAnimalPanel from '../SpecialCareAnimalPanel/SpecialCareAnimalPanel';
import GuideAndDeatilPanel from '../GuideAndDetailPanel/GuideAndDetailPanel';

interface ShelterTabsProps {
  shelterId: number;
}

export default function ShelterHomeTabs({ shelterId }: ShelterTabsProps) {
  const { data: shelterHomeInfo } = useShelterHomeInfo(shelterId);

  console.log('shelterhomeTab', shelterHomeInfo);

  const tabList: {
    title: string;
    PanelComp: () => JSX.Element;
  }[] = useMemo(
    () => [
      { title: '봉사 모집 일정', PanelComp: Calendar },
      {
        title: '안내 및 상세 정보',
        PanelComp: () => (
          <GuideAndDeatilPanel shelterHomeInfo={shelterHomeInfo!} />
        )
      },
      {
        title: '특별 케어 동물',
        PanelComp: SpecialCareAnimalPanel
      }
    ],
    [shelterHomeInfo]
  );

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
