import * as volunteer from '@/api/volunteer/my';
import * as shelter from '@/api/shelter/{shelterId}';
import Banner from '@/components/home/Banner/Banner';
import HomeCalendar from '@/components/home/HomeCalendar/HomeCalendar';
import UpcommingScheduleSection from '@/components/home/UpcommingSchedule/UpcommingScheduleSection';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_id, dangle_role: role } = decodeDangleToken(accessToken);

  let name = '';
  let shelterId = '';

  try {
    if (role === 'SHELTER' && dangle_id) {
      const { name: shelterName } = await shelter.get(dangle_id);
      name = String(shelterName);
      shelterId = String(dangle_id);
    }

    //TODO : 봉사자 정보 요청에는 권한 필요, 서버쪽에서 어떻게 권한처리 할것인지?
    // if (role === 'VOLUNTEER') {
    //   const { nickName: volunteerName } = await volunteer.get();
    //   console.log(volunteerName);
    //   name = String(volunteerName);
    // }
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <Banner name={name} shelterId={shelterId} />
      <UpcommingScheduleSection />
      <HomeCalendar />
      {/* 인터렉션 테스트용 */}
      <div style={{ height: '100vw' }}></div>
    </>
  );
}
