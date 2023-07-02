import { NextIcon, PrevIcon } from '@/asset/icons/index.ts';
import clsx from 'clsx';
import moment from 'moment';
import Calendar, { CalendarProps } from 'react-calendar';
import './DangleCalendar.css';
import * as styles from './DangleCalendar.css.ts';
import { LooseValue, Value } from 'react-calendar/dist/cjs/shared/types';

interface DangleCalendarProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  value?: LooseValue;
  onChange?: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
  mark?: (string | Date)[];
  changeMonthCallback?: (nextYear: number, nextMonth: number) => void;
}

export default function DangleCalendar({
  value,
  onChange,
  mark,
  changeMonthCallback,
  ...rest
}: DangleCalendarProps) {
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
          changeMonthCallback?.(nextYear, nextMonth);
        }}
        tileContent={({ date, view }) => {
          const html = [];
          const today = moment().startOf('day');
          const isToday = today.isSame(date, 'day');

          if (mark?.find(x => x === moment(date).format('YYYY-MM-DD'))) {
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
        }}
      />
    </>
  );
}
