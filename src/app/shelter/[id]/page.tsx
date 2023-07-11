'use client';
import ContainerWithStickyHeader from '@/components/common/ContainerWithStickyHeader/ContainerWithStickyHeader';
import MapExample from '@/components/common/Map/MapExample';
import Tabs from '@/components/common/Tab';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';
import Description from '@/components/shelter/Description';
import ShelterProfile from '@/components/shelter/ShelterProfile';
import ScheduleTab from '@/components/volunteer-schedule/ScheduleTab/ScheduleTab';
import { animalsMock } from '@/types/shelter';

const mockData = {
  shelterName: '보호소이름',
  imageSrc: '/sparkle.png',
  donation: '10000023230',
  description:
    '보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명,보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명'
};

export default async function ShelterMainPage({
  params
}: {
  params: { id: string };
}) {
  //TODO : 보호소 정보 가져오기
  const { shelterName, imageSrc, donation, description } =
    await (async params => {
      return new Promise<typeof mockData>(resolve =>
        setTimeout(() => resolve(mockData), 200)
      );
    })();

  return (
    <>
      <div>
        <ContainerWithStickyHeader headerProps={{ title: shelterName }}>
          <ShelterProfile
            shelterName={shelterName}
            imageSrc={imageSrc}
            donation={donation}
          />
          <Description description={description} />
        </ContainerWithStickyHeader>
        <Tabs defaultValue={0}>
          <Tabs.TabList>
            <Tabs.Tab value={0} title="봉사 모집 일정"></Tabs.Tab>
            <Tabs.Tab value={1} title="안내 및 상세 정보"></Tabs.Tab>
            <Tabs.Tab value={2} title="특별 케어 동물"></Tabs.Tab>
          </Tabs.TabList>

          <Tabs.TabPanel value={0}>
            <ScheduleTab />
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
      </div>
    </>
  );
}
