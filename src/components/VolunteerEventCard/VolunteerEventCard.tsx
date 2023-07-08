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
import * as styles from './VolunteerEventCard.css';

export interface VolunteerEvent {
  eventStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  category: string;
  volunteerEventId: number;
  title: string;
  recruitNum: number;
  participantNum: number;
  waitingNum: number;
  date: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  myParticipationStatus?: 'PARTICIPATING' | 'WAITING' | 'NONE';
}

interface VolunteerEventCardProps {
  event?: VolunteerEvent;
}

export default function VolunteerEventCard({ event }: VolunteerEventCardProps) {
  const pathname = usePathname();
  if (!event) return null;

  const {
    eventStatus,
    category,
    volunteerEventId,
    title,
    recruitNum,
    participantNum,
    waitingNum,
    date,
    startTime,
    endTime,
    myParticipationStatus
  } = event;

  return (
    <>
      <H3 style={{ margin: '16px 0px 12px 0px' }}>{formatDate(date)}</H3>
      <div
        className={styles.wrapper({
          status: eventStatus === 'IN_PROGRESS' ? 'process' : 'done'
        })}
      >
        <Link href={`${pathname}/${volunteerEventId}`}>
          <div className={styles.container}>
            <div className={styles.badgeWrapper}>
              {isDatePast(date) ? (
                <Badge type="gray">모집완료</Badge>
              ) : (
                <Badge type="primary">모집중</Badge>
              )}

              <Badge type="line">{`#${category}`}</Badge>
            </div>

            <H4 className={styles.textClamp}>{title}</H4>

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
                  {participantNum}/{recruitNum}명
                  {waitingNum > 0 && `(대기 ${waitingNum}명)`}
                </Caption2>
              </div>

              <div className={styles.status}>
                {myParticipationStatus === 'PARTICIPATING' ? (
                  <Caption2 color="error">신청 완료</Caption2>
                ) : myParticipationStatus === 'WAITING' ? (
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
