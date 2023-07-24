import { IterationCycle } from '@/constants/volunteerEvent';
import { getLocaleWeekday } from '@/utils/timeConvert';
import moment from 'moment';

export default function getIterationNotice(
  startAt: Date,
  cycle: IterationCycle
) {
  const weekday = getLocaleWeekday(startAt);
  let date = moment(startAt).date();

  let notice = '';
  switch (cycle) {
    case 'WEEKLY':
      notice = `매주 ${weekday}마다`;
      break;
    case 'BIWEEKLY':
      notice = `격주로 ${weekday}마다`;
      break;
    case 'MONTHLY':
      notice = `매월 ${date}일마다`;
      break;
    case 'EVERYDAY':
      notice = '월,화,수,목,금,토,일 마다';
      break;
    default:
      return '';
  }
  notice += ' 일정이 생성됩니다.';
  return notice;
}
