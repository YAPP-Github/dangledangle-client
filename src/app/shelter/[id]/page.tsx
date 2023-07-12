'use client';
import ContainerWithStickyHeader from '@/components/common/ContainerWithStickyHeader/ContainerWithStickyHeader';
import Description from '@/components/shelter/Description';
import ShelterProfile from '@/components/shelter/ShelterProfile';
import ShelterHomeTabs from '@/components/shelter/ShelterHomeTabs/ShelterHomeTabs';
import { get } from '@/api/shelter/{shelterId}';

export default async function ShelterMainPage({
  params
}: {
  params: { id: string };
}) {
  // 파라미터에서 보호소 아이디 파싱,
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
