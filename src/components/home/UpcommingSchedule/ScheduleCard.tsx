'use client';
import {
  Body3,
  Caption1,
  Caption2,
  Caption3,
  H4
} from '@/components/common/Typography';
import { UserRole } from '@/constants/user';
import {
  formatKoDate,
  getDuration,
  getLocaleWeekday,
  pmamConvert
} from '@/utils/timeConvert';
import * as styles from './ScheduleCard.css';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ArrowRight } from '@/asset/icons';
import Image from 'next/image';

interface ScheduleCardProps {
  shelterId: number;
  shelterName?: string;
  shelterImageProfileUrl?: string;
  userRole: UserRole;
  startAt: Date | string;
  endAt: Date | string;
  title: string;
  recruitNum: number;
  joinNum?: number;
  participantNum?: number;
  waitingNum: number;
}

export default function ScheduleCard({
  shelterId,
  shelterName,
  shelterImageProfileUrl,
  userRole,
  startAt,
  endAt,
  title,
  recruitNum,
  joinNum,
  participantNum,
  waitingNum
}: ScheduleCardProps) {
  const router = useRouter();
  const moveTo = () => {
    router.push(`/shelter/${shelterId}`);
  };
  const eventDay = `${formatKoDate(startAt)} ${getLocaleWeekday(startAt)}`;
  const duringTime = `${pmamConvert(startAt)} ${pmamConvert(
    endAt
  )} (${getDuration(startAt, endAt)})`;

  const joinOrParticipantNum =
    joinNum === 0 ? `${joinNum}` : joinNum || participantNum;

  return (
    <article className={clsx([styles.container, styles.paintFirstCard])}>
      <ArrowRight className={styles.arrowIcon} onClick={moveTo} />
      <div className={styles.timeInfo}>
        <Day>{eventDay}</Day>
        <Duringtime>{`${duringTime}`}</Duringtime>
      </div>
      <Title>{title}</Title>
      <div className={styles.bottomInfo}>
        {userRole === 'VOLUNTEER' && (
          <ShelterProfile
            shelterImageProfileUrl={shelterImageProfileUrl}
            shelterName={shelterName!}
          />
        )}
        <Waiting>
          {joinOrParticipantNum}/{recruitNum}명
          {waitingNum > 0 && `(대기 ${waitingNum}명)`}
        </Waiting>
      </div>
    </article>
  );
}

export function NoneScheduleCard() {
  return (
    <article className={clsx([styles.container, styles.deActivatedContent])}>
      <DeActivatedText>진행 예정인 일정이 없습니다.</DeActivatedText>
      <DeActivatedText>모집 중인 봉사 일정을 둘러보세요!</DeActivatedText>
    </article>
  );
}

export function NoticeLoginScheduleCard() {
  const router = useRouter();
  return (
    <article
      style={{
        cursor: 'pointer'
      }}
      className={clsx([styles.container, styles.deActivatedContent])}
      onClick={() => {
        router.push('/login');
      }}
    >
      <div className={styles.deActivatedContent}>
        <DeActivatedText>
          로그인하여 다가오는 일정을 확인해보세요
        </DeActivatedText>
      </div>
    </article>
  );
}

const Day = ({ children }: PropsWithChildren) => (
  <Caption1 className={styles.firstCardVariation}>{children}</Caption1>
);

const Duringtime = ({ children }: PropsWithChildren) => (
  <Caption3 className={styles.firstCardVariation}>{children}</Caption3>
);
const Title = ({ children }: PropsWithChildren) => (
  <H4 className={styles.title}>{children}</H4>
);

const ShelterProfile = ({
  shelterImageProfileUrl,
  shelterName
}: {
  shelterImageProfileUrl?: string;
  shelterName: string;
}) => (
  <div className={styles.profileContainer}>
    <Image
      style={{ borderRadius: '50%' }}
      src={shelterImageProfileUrl || '/images/Shelter.png'}
      width={20}
      height={20}
      alt={`${shelterName}`}
    />
    <Caption2 className={styles.firstCardVariation}>{shelterName}</Caption2>
  </div>
);
const Waiting = ({ children }: PropsWithChildren) => (
  <Caption1 className={styles.firstCardVariation}>{children}</Caption1>
);

const DeActivatedText = ({ children }: PropsWithChildren) => (
  <Body3 color="gray400" style={{ cursor: 'default' }}>
    {children}
  </Body3>
);
