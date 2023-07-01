import ContainerWithStickyHeader from '@/components/common/ContainerWithStickyHeader/ContainerWithStickyHeader';
import Description from '@/components/shelter/Description';
import ShelterProfile from '@/components/shelter/ShelterProfile';

const mockData = {
  shelterName: '보호소이름',
  imageSrc: '/sparkle.png',
  donation: '1000000',
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
      </div>
      <div style={{ height: '100vh', backgroundColor: 'beige' }}></div>
    </>
  );
}
