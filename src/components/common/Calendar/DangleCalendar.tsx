import { NextIcon, PrevIcon } from '@/asset/icons/index.ts';
import clsx from 'clsx';
import moment from 'moment';
import Calendar, { CalendarProps } from 'react-calendar';
import * as styles from './DangleCalendar.css.ts';
import { LooseValue, Value } from 'react-calendar/dist/cjs/shared/types';
import { useCallback } from 'react';

interface DangleCalendarProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  id: string;
  value?: LooseValue;
  onChange?: (value: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
  mark?: (string | Date)[];
  onChangeMonth?: (value: Date) => void;
}

export default function DangleCalendar({
  id,
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
    <div id={id} className={clsx(rest.className)}>
      <Calendar
        {...rest}
        value={value}
        onChange={(value, e) => onChange && onChange(value as Date, e)}
        className={clsx(styles.calendar)}
        locale="ko-KO"
        formatDay={(locale, date) => moment(date).format('DD')}
        next2Label={null}
        prev2Label={null}
        nextLabel={<NextIcon />}
        prevLabel={<PrevIcon />}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
          activeStartDate && onChangeMonth?.(activeStartDate);
        }}
        tileContent={handleDotIcon}
      />
    </div>
  );
}
