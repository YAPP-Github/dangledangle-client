import { Clock, Profile } from '@/asset/icons';
import Badge from '@/components/common/Badge/Badge';
import { Caption1, Caption2, H4 } from '@/components/common/Typography';
import { getDuration, isDatePast, pmamConvert } from '@/utils/timeConvert';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as styles from './VolunteerEventCard.css';
import { CSSProperties } from 'react';
import {
  HomeVolunteerEvent,
  VolunteerEvent
} from '../../../types/volunteerEvent';
import { VOLUNTEER_EVENT_CATEGORY } from '@/constants/volunteerEvent';
import Avartar from '@/components/common/Avartar/Avartar';

interface VolunteerEventCardProps {
  event?: VolunteerEvent | HomeVolunteerEvent;
  style?: CSSProperties;
}

export default function VolunteerEventCard({
  event,
  style
}: VolunteerEventCardProps) {
  const params = useParams();
  if (!event) return null;

  const shelterId = 'shelterId' in event ? event.shelterId : params.id;

  const {
    eventStatus,
    category,
    volunteerEventId,
    title,
    recruitNum,
    joinNum,
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
        <Link href={`/shelter/${shelterId}/event/${volunteerEventId}`}>
          <div className={styles.container}>
            <div className={styles.badgeWrapper}>
              {isDatePast(startAt) ? (
                <Badge type="gray">모집종료</Badge>
              ) : (
                <Badge type="primary">모집중</Badge>
              )}

              <Badge type="line">{`#${VOLUNTEER_EVENT_CATEGORY[category]}`}</Badge>
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
                  {joinNum}/{recruitNum}명
                  {waitingNum > 0 && `(대기 ${waitingNum}명)`}
                </Caption1>
              </div>

              <div className={styles.statusWrapper}>
                {'shelterId' in event && (
                  <div className={styles.shelterInfo}>
                    <Avartar
                      size="20"
                      shape="circle"
                      defaultImage="shelter"
                      imagePath={event.shelterProfileImageUrl}
                    />
                    <Caption2>{event.shelterName}</Caption2>
                  </div>
                )}
                {myParticipationStatus === 'PARTICIPATING' ? (
                  <Caption1 color="error" className={styles.myStatus}>
                    신청 완료
                  </Caption1>
                ) : myParticipationStatus === 'WAITING' ? (
                  <Caption1 color="gray600" className={styles.myStatus}>
                    신청 대기중
                  </Caption1>
                ) : null}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
