import ContainerWithStickyHeader from '@/components/common/ContainerWithStickyHeader/ContainerWithStickyHeader';
import Description from '@/components/shelter/Description';
import ShelterProfile from '@/components/shelter/ShelterProfile';
import ShelterHomeTabs from '@/components/shelter/ShelterHomeTabs/ShelterHomeTabs';
import Calendar from '@/components/common/Calendar/Calendar';
import MapExample from '@/components/common/Map/MapExample';
import { ShelterHomeTabRenderInfo, animalsMock } from '@/types/shelter';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';
import GuideAndDeatil from '@/components/shelter/GuideAndDetailPanel/GuideAndDetailPanel';
import SpecialCareAnimalPanel from '@/components/shelter/SpecialCareAnimalPanel/SpecialCareAnimalPanel';

//TODO /v1/shelter/{shelterId} api schema 타입 적용
const mockData = {
  shelterName: '보호소이름',
  imageSrc: '/sparkle.png',
  donation: '10000023230',
  description:
    '보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명,보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명,보호소 설명보호소 설명보호소 설명보호소 설명보호소 설명'
};

const shelterHomeTabList: ShelterHomeTabRenderInfo[] = [
  { title: '봉사 모집 일정', PanelComp: Calendar },
  { title: '안내 및 상세 정보', PanelComp: GuideAndDeatil },
  {
    title: '특별 케어 동물',
    PanelComp: SpecialCareAnimalPanel
  }
];

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
      <ContainerWithStickyHeader headerProps={{ title: shelterName }}>
        <ShelterProfile
          shelterName={shelterName}
          imageSrc={imageSrc}
          donation={donation}
        />
        <Description description={description} />
      </ContainerWithStickyHeader>

      <ShelterHomeTabs tabList={shelterHomeTabList} />
    </>
  );
}
