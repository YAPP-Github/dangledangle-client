'use client';
import Tabs from '@/components/common/Tab';
import { useMemo } from 'react';
import SpecialCareAnimalTab from '../SpecialCareAnimalTab/SpecialCareAnimalTab';
import GuideAndDeatailPanel from '../GuideAndDetailTab/GuideAndDetailTab';
import useShelterHomeInfo from '@/api/shelter/{shelterId}/useShelterHomeInfo';
import ScheduleTab from '@/components/volunteer-schedule/ScheduleTab/ScheduleTab';

interface ShelterTabsProps {
  shelterId: number;
}

type ShelterTabRenderModel = {
  title: string;
  PanelComp: () => JSX.Element;
};

export default function ShelterHomeTabs({ shelterId }: ShelterTabsProps) {
  const { data: shelterHomeInfo } = useShelterHomeInfo(shelterId);

  //@prettier-ignore
  const tabList: ShelterTabRenderModel[] = useMemo(
    () => [
      {
        title: '봉사 모집 일정',
        PanelComp: () => <ScheduleTab />
      },
      {
        title: '안내 및 상세 정보',
        PanelComp: () => (
          <GuideAndDeatailPanel shelterHomeInfo={shelterHomeInfo!} />
        )
      },
      {
        title: '특별 케어 동물',
        PanelComp: () => <SpecialCareAnimalTab shelterId={shelterId} />
      }
    ],
    [shelterId, shelterHomeInfo]
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
