import { Calendar, Clockmd } from '@/asset/icons';
import Badge from '@/components/common/Badge/Badge';
import { Body2, Body4, H4 } from '@/components/common/Typography';
import {
  formatKoDate,
  getDuration,
  isDatePast,
  pmamConvert
} from '@/utils/timeConvert';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './ShelterEvent.css';
import DangleMap from '@/components/common/Map/DangleMap';
import FixedFooter from '@/components/common/FixedFooter/FixedFooter';
import Button from '@/components/common/Button/Button';

interface address {
  address: string;
  addressDetail: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface VolunteerEventDetail {
  volunteerEventId: number;
  title: string;
  recruitNum: number;
  address: address;
  description: string;
  ageLimit: any;
  category: any;
  eventStatus: 'IN_PROGRESS' | 'DONE' | 'CANCELED';
  myParticipationStatus?: 'PARTICIPATING' | 'WAITING' | 'NONE';
  startAt: string;
  endAt: string;
  joiningVolunteers: string[];
  waitingVolunteers: string[];
}

interface ShelterEventProps {
  eventDetail: VolunteerEventDetail;
}

export default function ShelterEvent({ eventDetail }: ShelterEventProps) {
  if (!eventDetail) return null;

  const {
    title,
    recruitNum,
    address,
    description,
    ageLimit,
    category,
    eventStatus,
    myParticipationStatus,
    startAt,
    endAt,
    joiningVolunteers,
    waitingVolunteers
  } = eventDetail;

  return (
    <>
      <div className={styles.eventHeader}>
        <div className={styles.container}>
          <div className={styles.badgeWrapper}>
            {isDatePast(startAt) ? (
              <Badge type="gray">모집완료</Badge>
            ) : (
              <Badge type="primary">모집중</Badge>
            )}

            <Badge type="line">{`#${category}`}</Badge>
          </div>
          <p className={styles.title}>{title}</p>
          <div className={styles.infoContainer}>
            <div className={styles.infoWrapper}>
              <Calendar />
              <Body2 color="gray900">{formatKoDate(startAt)}</Body2>
            </div>
            <div className={styles.infoWrapper}>
              <Clockmd />
              <Body2 color="gray900">
                {pmamConvert(startAt)}
                &nbsp;-&nbsp;
                {pmamConvert(endAt)}
                &nbsp;(
                {getDuration(startAt, endAt)})
              </Body2>
            </div>
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '8px'
            })}
          />

          <H4>참여중인 인원 /{recruitNum}</H4>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '1px'
            })}
          />

          <div className={styles.textWrapper}>
            <H4>봉사 소개</H4>
            <Body4>{description}</Body4>
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '1px'
            })}
          />

          <div className={styles.textWrapper}>
            <H4>모집 대상</H4>
            <Body4>{ageLimit}</Body4>
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '1px'
            })}
          />

          <div className={styles.textWrapper}>
            <H4>위치</H4>
            <DangleMap
              address={address.address}
              latitude={address?.latitude}
              longitude={address?.longitude}
            />
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '8px'
            })}
          />
        </div>
      </div>
      <FixedFooter>
        <Button>일정 수정하기</Button>
      </FixedFooter>
    </>
  );
}
