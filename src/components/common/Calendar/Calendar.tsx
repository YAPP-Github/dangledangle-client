'use client';

import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
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
  const datMark = ['2023-07-02', '2023-07-22', '2023-07-10'];

  return (
    <div>
      <DangleCalendar
        value={value}
        onChange={handleChange}
        mark={datMark}
        changeMonthCallback={handleChangeMonth}
      />
    </div>
  );
}