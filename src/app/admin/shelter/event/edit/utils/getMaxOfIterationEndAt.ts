import { formatDatetimeForServer } from '@/utils/timeConvert';
import moment from 'moment';

export default function getMaxOfIterationEndAt() {
  return formatDatetimeForServer(moment().add(6, 'M'), 'DATE');
}
