'use client';
import { MyShelterEvent, MyVolunteerEvent } from '@/api/mypage/event/event';
import { ArrowRightLg } from '@/asset/icons';
import Avartar from '@/components/common/Avartar/Avartar';
import {
  Caption1,
  Caption2,
  Caption3,
  H4
} from '@/components/common/Typography';
import { MY_STATUS, SHELTER_STATUS } from '@/constants/volunteerEvent';
import { useAuthContext } from '@/providers/AuthContext';
import { formatKoDate, getDuration, pmamConvert } from '@/utils/timeConvert';
import Link from 'next/link';
import * as styles from './MyPageCard.css';

interface MyPageCardProps {
  event: MyShelterEvent | MyVolunteerEvent;
  isVolunteer?: boolean;
}

interface ShelterInfoProps {
  event: MyShelterEvent;
}

interface VolunteerInfoProps {
  event: MyVolunteerEvent;
}

export function isShelterCard(
  obj: MyShelterEvent | MyVolunteerEvent | undefined
): obj is MyShelterEvent {
  return obj !== undefined && 'eventStatus' in obj;
}

export default function MyPageCard({ event, isVolunteer }: MyPageCardProps) {
  const { dangle_id: shelterId } = useAuthContext();
  if (!event) return null;
  const status = isVolunteer
    ? MY_STATUS[(event as MyVolunteerEvent).myParticipationStatus]
    : SHELTER_STATUS[(event as MyShelterEvent).eventStatus];

  return (
    <div
      className={styles.container({
        color:
          status === MY_STATUS.DONE || status === SHELTER_STATUS.DONE
            ? 'gray'
            : 'white'
      })}
    >
      <Link
        href={
          isVolunteer
            ? `/shelter/${(event as MyVolunteerEvent)?.shelterId}/event/${
                (event as MyVolunteerEvent)?.volunteerEventId
              }`
            : `/shelter/${shelterId}/event/${event.volunteerEventId}`
        }
      >
        <EventInfo event={event} />
        <H4 className={styles.textClamp}>{event.title}</H4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {isVolunteer ? (
            <VolunteerInfo event={event as MyVolunteerEvent} />
          ) : (
            <ShelterInfo event={event as MyShelterEvent} />
          )}

          {status !== MY_STATUS.DONE && status !== SHELTER_STATUS.DONE ? (
            <Caption1
              color={
                status === MY_STATUS.JOINING ||
                status === SHELTER_STATUS.IN_PROGRESS
                  ? 'error'
                  : 'gray600'
              }
            >
              {status}
            </Caption1>
          ) : null}
        </div>
      </Link>
    </div>
  );
}

function EventInfo({ event }: MyPageCardProps) {
  return (
    <div>
      <div className={styles.txtLine}>
        <Caption1>
          {formatKoDate(event.startAt, 'YYYY년 M월 D일 dddd')}
        </Caption1>
        <ArrowRightLg />
      </div>
      <Caption3 color="gray600" style={{ marginTop: '2px' }}>
        {pmamConvert(event.startAt)}
        &nbsp;-&nbsp;
        {pmamConvert(event.endAt)}
        &nbsp;(
        {getDuration(event.startAt, event.endAt)})
      </Caption3>
    </div>
  );
}

function ShelterInfo({ event }: ShelterInfoProps) {
  return (
    <Caption1 color="gray600">
      {event.participantNum + event.recruitNum}/{event.recruitNum}명
    </Caption1>
  );
}

function VolunteerInfo({ event }: VolunteerInfoProps) {
  return (
    <div className={styles.avartar}>
      <Avartar
        size="20"
        defaultImage="shelter"
        shape="circle"
        alt={`${event.volunteerEventId}의 프로필 이미지`}
        imagePath={(event as MyVolunteerEvent).shelterImageProfileUrl}
      ></Avartar>
      <Caption2>{event.shelterName}</Caption2>
    </div>
  );
}
