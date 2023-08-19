import * as volunteer from '@/api/volunteer/my';
import * as shelter from '@/api/shelter/{shelterId}';
import Banner from '@/components/home/Banner/Banner';
import UpcommingScheduleSection from '@/components/home/UpcommingSchedule/UpcommingScheduleSection';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';
import CalendarSection from '@/components/home/CalendarSection/CalendarSection';

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

    if (role === 'VOLUNTEER') {
      const { nickName: volunteerName } = await volunteer.get();
      name = String(volunteerName);
    }
  } catch (e) {
    console.log('home page error');
    console.log(e);
  }

  return (
    <>
      <Banner name={name} shelterId={shelterId} />
      <UpcommingScheduleSection />
      <hr style={{ marginTop: '8px' }} />
      <CalendarSection />
    </>
  );
}
