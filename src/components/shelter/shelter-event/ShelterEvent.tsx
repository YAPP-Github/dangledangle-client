import { Calendar, Clockmd } from '@/asset/icons';
import Badge from '@/components/common/Badge/Badge';
import { Body2, Body1, H4, Body3 } from '@/components/common/Typography';
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
import { palette } from '@/styles/color';
import { Fragment } from 'react';
import Image from 'next/image';

const NOTICE = '*세부 주소는 봉사 참가자에게 별도로 안내드립니다.';
interface address {
  address: string;
  addressDetail: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface VolunteerEventDetail {
  shelterName: string;
  imageSrc: string;
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
    shelterName,
    imageSrc,
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

  const renderTextWithLineBreaks = (description: string) => {
    const lines = description.split('\n');

    return (
      <>
        {lines.map((line, index) => (
          <Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </>
    );
  };

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

          <div className={styles.profileWraper}>
            <Image
              width={32}
              height={32}
              className={styles.profileImage}
              src={imageSrc}
              alt={`${shelterName}-profile-image`}
            />
            <Body3>{shelterName}</Body3>
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '8px'
            })}
          />

          <H4>
            참여중인 인원{' '}
            <span style={{ color: palette.error }}>
              {joiningVolunteers?.length}
            </span>
            /{recruitNum}
          </H4>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '1px'
            })}
          />

          <div className={styles.textWrapper}>
            <H4>봉사 소개</H4>

            <Body1>{renderTextWithLineBreaks(description)}</Body1>
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '1px'
            })}
          />

          <div className={styles.textWrapper}>
            <H4>모집 대상</H4>
            <Body1>{ageLimit}</Body1>
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
              notice={NOTICE}
            />
          </div>

          <div
            className={styles.divider}
            style={assignInlineVars({
              [styles.dividerHeghit]: '8px'
            })}
          />

          <p className={styles.underline}>자주 묻고 답하는 질문</p>
          <p className={styles.underline}>1:1 문의하기</p>
        </div>
      </div>
      <FixedFooter>
        <Button>봉사 신청하기</Button>
      </FixedFooter>
    </>
  );
}
