'use client';

import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
import VolunteerEventCard, {
  VolunteerEvent
} from '@/components/global/VolunteerEventCard/VolunteerEventCard';

import { useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function Calendar() {
  const [value, setValue] = useState<Date>(new Date());
  const handleChange = (
    value: Value,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(value);
    setValue(new Date(value!.toString()));
  };

  // onActiveStartDateChange 이벤트를 사용해 월이 변경될 때마다 콜백 함수를 호출할 수 있습니다.
  const handleChangeMonth = (nextYear: number, nextMonth: number) => {
    console.log(nextYear, nextMonth);
  };

  // datMark array를 넘겨 캘린더에 닷 아이콘을 렌더링 할 수 있습니다.
  const dotMark = eventMock?.map(item => item.date);

  return (
    <div>
      <DangleCalendar
        value={value}
        onChange={handleChange}
        mark={dotMark}
        onChangeMonth={handleChangeMonth}
      />

      {eventMock?.map(event => (
        <VolunteerEventCard key={event.volunteerEventId} event={event} />
      ))}
    </div>
  );
}

const eventMock: VolunteerEvent[] = [
  {
    eventStatus: 'DONE',
    category: '산책 봉사',
    volunteerEventId: 11,
    title: '한강 인근 댕댕이 산책 봉사자 모집합니다.',
    recruitNum: 5,
    participantNum: 5,
    waitingNum: 2,
    date: '2023-07-01',
    startTime: '17:00',
    endTime: '19:00',
    myParticipationStatus: 'NONE'
  },
  {
    eventStatus: 'DONE',
    category: '산책 봉사',
    volunteerEventId: 12,
    title: '태평역 인근 산책 봉사자 모집합니다.',
    recruitNum: 5,
    participantNum: 5,
    waitingNum: 5,
    date: '2023-07-02',
    startTime: '17:00',
    endTime: '18:00',
    myParticipationStatus: 'PARTICIPATING'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: '견사 청소',
    volunteerEventId: 13,
    title: '노원역 인근 견사 청소 봉사자 모집합니다.',
    participantNum: 4,
    recruitNum: 5,
    waitingNum: 0,
    date: '2023-07-22',
    startTime: '17:00',
    endTime: '18:30',
    myParticipationStatus: 'WAITING'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: '홍보물 제작',
    volunteerEventId: 14,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    participantNum: 6,
    waitingNum: 3,
    date: '2023-07-25',
    startTime: '17:00',
    endTime: '19:30',
    myParticipationStatus: 'NONE'
  }
];
