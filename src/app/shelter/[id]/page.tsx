import ContainerWithStickyHeader from '@/components/common/ContainerWithStickyHeader/ContainerWithStickyHeader';
import { get } from '@/api/shelter/{shelterId}';
import ShelterProfile from '@/components/shelter/ShelterProfile/ShelterProfile';
import Description from '@/components/shelter/ShelterProfile/Description/Description';
import ShelterHomeTabs from '@/components/shelter/tab/ShelterHomeTabs/ShelterHomeTabs';

export default async function ShelterMainPage({
  params
}: {
  params: { id: string };
}) {
  const shelterId = Number(params.id);
  if (typeof shelterId !== 'number') {
    throw Error('잘못된 접근, 에러페이지로 이동');
  }

  //보호소 정보 서버컴포넌트에서 fetch
  const shelterHomeInfo = await get(shelterId);

  return (
    <>
      <ContainerWithStickyHeader headerProps={{ title: shelterHomeInfo.name }}>
        <ShelterProfile
          shelterId={shelterId}
          shelterName={shelterHomeInfo.name}
          profileImageUrl={shelterHomeInfo.profileImageUrl}
          bankAccount={shelterHomeInfo.bankAccount}
        />
        <Description description={shelterHomeInfo.description} />
      </ContainerWithStickyHeader>

      <ShelterHomeTabs shelterId={shelterId} />
    </>
  );
}
