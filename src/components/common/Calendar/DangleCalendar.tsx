import { NextIcon, PrevIcon } from '@/asset/icons/index.ts';
import clsx from 'clsx';
import moment from 'moment';
import Calendar, { CalendarProps } from 'react-calendar';
import './DangleCalendar.css';
import * as styles from './DangleCalendar.css.ts';
import { LooseValue, Value } from 'react-calendar/dist/cjs/shared/types';
import { useCallback } from 'react';

interface DangleCalendarProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  value?: LooseValue;
  onChange?: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
  mark?: (string | Date)[];
  onChangeMonth?: (nextYear: number, nextMonth: number) => void;
}

export default function DangleCalendar({
  value,
  onChange,
  mark,
  onChangeMonth,
  ...rest
}: DangleCalendarProps) {
  const handleDotIcon = useCallback(
    ({ date }: { date: Date }) => {
      const html = [];
      const today = moment().startOf('day');
      const isToday = today.isSame(date, 'day');
      const isMarked = mark?.find(x => x === moment(date).format('YYYY-MM-DD'));

      if (isMarked) {
        html.push(
          <div
            key={Date.now()}
            className={clsx([
              styles.dot({ date: isToday ? 'today' : 'other' })
            ])}
          ></div>
        );
      }
      return (
        <>
          <div className={styles.dotWrapper}>{html}</div>
        </>
      );
    },
    [mark]
  );

  return (
    <>
      <Calendar
        {...rest}
        value={value}
        onChange={onChange}
        className={styles.calendar}
        locale="ko-KO"
        formatDay={(locale, date) => moment(date).format('DD')}
        next2Label={null}
        prev2Label={null}
        nextLabel={<NextIcon />}
        prevLabel={<PrevIcon />}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
          const nextYear = activeStartDate!.getFullYear();
          const nextMonth = activeStartDate!.getMonth() + 1;
          onChangeMonth?.(nextYear, nextMonth);
        }}
        tileContent={handleDotIcon}
      />
    </>
  );
}
