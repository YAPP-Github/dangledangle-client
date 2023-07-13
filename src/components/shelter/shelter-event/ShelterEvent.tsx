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
import FixedFooter from '@/components/common/FixedFooter/FixedFooter';
import Button from '@/components/common/Button/Button';
import { palette } from '@/styles/color';
import { Fragment } from 'react';
import Image from 'next/image';
import Profile from '@/components/common/Profile/Profile';
import { usePathname, useRouter } from 'next/navigation';
import useVolunteerEvent from '@/api/shelter/event/useVolunteerEvent';
import dynamic from 'next/dynamic';
import LoadingIndicator from '@/components/common/Button/LoadingIndicator';
import useWithdrawVolEvent from '@/api/shelter/event/useWithdrawVolEvent';
import useParticipateVolEvent from '@/api/shelter/event/useParticipateVolEvent';
import Link from 'next/link';

const NOTICE = '*세부 주소는 봉사 참가자에게 별도로 안내드립니다.';
const DangleMap = dynamic(() => import('@/components/common/Map/DangleMap'), {
  loading: () => <LoadingIndicator color="primary" />
});

export default function ShelterEvent() {
  const route = useRouter();
  const pathname = usePathname();
  const splittedPath = pathname.split('/');
  const shelterId = Number(splittedPath[2]);
  const volunteerEventId = Number(splittedPath[4]);

  const { data: eventDetail } = useVolunteerEvent(shelterId, volunteerEventId);
  const { mutateAsync: participateEvt } = useParticipateVolEvent();
  const { mutateAsync: withdrawEvt } = useWithdrawVolEvent();

  if (!eventDetail) return <LoadingIndicator color="primary" />;

  const {
    shelterName,
    shelterProfileImageUrl,
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

  const handleParticipate = () => {
    participateEvt({ shelterId, volunteerEventId });
  };
  const handleWithdraw = () => {
    withdrawEvt({ shelterId, volunteerEventId });
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
              src={shelterProfileImageUrl || '/images/DefaultAnimal.png'}
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
          <div className={styles.textWrapper}>
            <H4>
              참여중인 인원{' '}
              <span style={{ color: palette.error }}>
                {joiningVolunteers?.length}
              </span>
              /{recruitNum}
            </H4>

            {joiningVolunteers?.map((people: string, index) => (
              <Profile key={index} name={people} />
            ))}
          </div>
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

      <FixedFooter color={palette.white}>
        {/* {myParticipationStatus === 'NONE' && (
          <Button onClick={handleParticipate}>봉사 신청하기</Button>
        )}
        {myParticipationStatus === ('JOINING' || 'WATING') && (
          <Button onClick={handleWithdraw}>봉사 신청 취소하기</Button>
        )} */}

        <Button
          style={{ marginTop: 1 }}
          onClick={() => route.push(`${pathname}/edit`)}
        >
          일정 수정하기
        </Button>
      </FixedFooter>
    </>
  );
}
