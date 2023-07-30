import Banner from '@/components/home/Banner/Banner';
import HomeCalendar from '@/components/home/HomeCalendar/HomeCalendar';
import UpcommingScheduleSection from '@/components/home/UpcommingSchedule/UpcommingScheduleSection';

export default function HomePage() {
  return (
    <>
      <Banner name="sangjun" shelterId="2" />
      <UpcommingScheduleSection />
      <HomeCalendar />
    </>
  );
}
