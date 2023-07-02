import { Clock, Profile } from '@/asset/icons';
import Badge from '@/components/common/Badge/Badge';
import { Caption2, H3, H4 } from '@/components/common/Typography';
import {
  formatDate,
  getDuration,
  isDatePast,
  pmamConvert
} from '@/utils/timeConvert';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './EventCard.css';

export interface EventPayload {
  category: string;
  eventId: number;
  eventName: string;
  participant: number;
  capacity: number;
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  status?: 'APPLY' | 'WATING' | 'NONE';
}

interface EventCardProps {
  event?: EventPayload;
}

export default function EventCard({ event }: EventCardProps) {
  const pathname = usePathname();
  if (!event) return null;

  const {
    category,
    eventId,
    eventName,
    participant,
    capacity,
    date,
    startTime,
    endTime,
    status
  } = event;

  return (
    <>
      <H3 style={{ margin: '16px 0px 12px 0px' }}>{formatDate(date)}</H3>
      <div className={styles.wrapper}>
        <Link href={`${pathname}/${eventId}`}>
          <div className={styles.container}>
            <div className={styles.badgeWrapper}>
              {isDatePast(date) ? (
                <Badge type="gray">모집완료</Badge>
              ) : (
                <Badge type="primary">모집중</Badge>
              )}

              <Badge type="line">{`#${category}`}</Badge>
            </div>

            <H4 className={styles.textClamp}>{eventName}</H4>

            <div className={styles.infoContainer}>
              <div className={styles.infoWrapper}>
                <Clock />
                <Caption2 color="gray700">
                  {pmamConvert(startTime)}
                  &nbsp;-&nbsp;
                  {pmamConvert(endTime)}
                  &nbsp;(
                  {getDuration(startTime, endTime)})
                </Caption2>
              </div>

              <div className={styles.infoWrapper}>
                <Profile />
                <Caption2 color="gray700">
                  {participant > capacity ? capacity : participant}/{capacity}명
                  {participant > capacity
                    ? ` (대기 ${participant - capacity}명)`
                    : null}
                </Caption2>
              </div>

              <div className={styles.status}>
                {status === 'APPLY' ? (
                  <Caption2 color="error">신청 완료</Caption2>
                ) : status === 'WATING' ? (
                  <Caption2 color="gray600">신청 대기중</Caption2>
                ) : null}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
