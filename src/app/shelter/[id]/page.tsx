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
  if (!Number(params.id)) throw Error('잘못된 접근');

  const shelterHomeInfo = await get(Number(params.id));

  return (
    <>
      <ContainerWithStickyHeader headerProps={{ title: shelterHomeInfo.name }}>
        <ShelterProfile
          shelterName={shelterHomeInfo.name}
          imageSrc={shelterHomeInfo.profileImageUrl}
          donation={shelterHomeInfo.bankAccount}
        />
        <Description description={shelterHomeInfo.description} />
      </ContainerWithStickyHeader>

      <ShelterHomeTabs shelterId={Number(params.id)} />
    </>
  );
}
