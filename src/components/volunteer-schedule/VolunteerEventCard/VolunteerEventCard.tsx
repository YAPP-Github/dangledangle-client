import { Clock, Profile } from '@/asset/icons';
import Badge from '@/components/common/Badge/Badge';
import { Caption1, H4 } from '@/components/common/Typography';
import { getDuration, isDatePast, pmamConvert } from '@/utils/timeConvert';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './VolunteerEventCard.css';
import { CSSProperties } from 'react';

export interface VolunteerEvent {
  volunteerEventId: number;
  eventStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  category: string;
  title: string;
  recruitNum: number;
  participantNum: number;
  waitingNum: number;
  startAt: string;
  endAt: string;
  myParticipationStatus?: 'PARTICIPATING' | 'WAITING' | 'NONE';
}

interface VolunteerEventCardProps {
  event?: VolunteerEvent;
  style?: CSSProperties;
}

export default function VolunteerEventCard({
  event,
  style
}: VolunteerEventCardProps) {
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
    startAt,
    endAt,
    myParticipationStatus
  } = event;

  return (
    <>
      <div
        className={styles.wrapper({
          status: eventStatus === 'IN_PROGRESS' ? 'process' : 'done'
        })}
        style={style}
      >
        <Link href={`${pathname}/${volunteerEventId}`}>
          <div className={styles.container}>
            <div className={styles.badgeWrapper}>
              {isDatePast(startAt) ? (
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
                <Caption1 color="gray700">
                  {pmamConvert(startAt)}
                  &nbsp;-&nbsp;
                  {pmamConvert(endAt)}
                  &nbsp;(
                  {getDuration(startAt, endAt)})
                </Caption1>
              </div>

              <div className={styles.infoWrapper}>
                <Profile />
                <Caption1 color="gray700">
                  {participantNum}/{recruitNum}명
                  {waitingNum > 0 && `(대기 ${waitingNum}명)`}
                </Caption1>
              </div>

              <div className={styles.status}>
                {myParticipationStatus === 'PARTICIPATING' ? (
                  <Caption1 color="error">신청 완료</Caption1>
                ) : myParticipationStatus === 'WAITING' ? (
                  <Caption1 color="gray600">신청 대기중</Caption1>
                ) : null}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
