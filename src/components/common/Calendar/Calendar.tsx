'use client';

import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
import EventCard, {
  EventPayload
} from '@/components/global/EventCard/EventCard';
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
  const datMark = eventMock?.map(item => item.date);

  return (
    <div>
      <DangleCalendar
        value={value}
        onChange={handleChange}
        mark={datMark}
        onChangeMonth={handleChangeMonth}
      />

      {eventMock?.map(event => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}

const eventMock: EventPayload[] = [
  {
    category: '산책 봉사',
    eventId: 11,
    eventName: '한강 인근 댕댕이 산책 봉사자 모집합니다.',
    participant: 7,
    capacity: 5,
    date: '2023-07-01',
    startTime: '17:00',
    endTime: '19:00',
    status: 'NONE'
  },
  {
    category: '산책 봉사',
    eventId: 12,
    eventName: '태평역 인근 산책 봉사자 모집합니다.',
    participant: 10,
    capacity: 5,
    date: '2023-07-02',
    startTime: '17:00',
    endTime: '18:00',
    status: 'APPLY'
  },
  {
    category: '견사 청소',
    eventId: 13,
    eventName: '노원역 인근 견사 청소 봉사자 모집합니다.',
    participant: 4,
    capacity: 5,
    date: '2023-07-22',
    startTime: '17:00',
    endTime: '18:30',
    status: 'WATING'
  },
  {
    category: '홍보물 제작',
    eventId: 14,
    eventName: '홍보물 제작 봉사자 모집합니다.',
    participant: 9,
    capacity: 6,
    date: '2023-07-25',
    startTime: '17:00',
    endTime: '19:30',
    status: 'NONE'
  }
];
