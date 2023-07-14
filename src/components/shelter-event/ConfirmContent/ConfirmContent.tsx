import { Calendar, Clockmd, Profilemd } from '@/asset/icons';
import Button from '@/components/common/Button/Button';

import { Body2, ButtonText1, H3 } from '@/components/common/Typography';
import React from 'react';
import * as styles from './ConfirmContent.css';
import { formatKoDate, getDuration, pmamConvert } from '@/utils/timeConvert';
import useWithdrawVolEvent from '@/api/shelter/event/useWithdrawVolEvent';
import useParticipateVolEvent from '@/api/shelter/event/useParticipateVolEvent';
import { VolunteerEvent } from '@/api/shelter/event/volunteer-event';
import useToast from '@/hooks/useToast';

interface ConfirmContentProps {
  eventDetail: VolunteerEvent;
  shelterId: number;
  volunteerEventId: number;
  onClose: () => void;
}

export default function ConfirmContent({
  eventDetail,
  shelterId,
  volunteerEventId,
  onClose
}: ConfirmContentProps) {
  const {
    recruitNum,
    eventStatus,
    myParticipationStatus,
    startAt,
    endAt,
    joiningVolunteers,
    waitingVolunteers
  } = eventDetail;

  const toastOn = useToast();
  const { mutateAsync: participateEvt } = useParticipateVolEvent();
  const { mutateAsync: withdrawEvt } = useWithdrawVolEvent();

  const handleParticipate = () => {
    participateEvt({ shelterId, volunteerEventId }).then(() => {
      if (joiningVolunteers?.length < recruitNum) {
        toastOn('봉사 신청이 완료되었습니다!');
      } else {
        toastOn('해당 봉사 일정에 대기 신청했습니다.');
      }
    });
    onClose();
  };
  const handleWithdraw = () => {
    withdrawEvt({ shelterId, volunteerEventId }).then(() => {
      if (joiningVolunteers?.length < recruitNum) {
        toastOn('봉사 신청을 취소하였습니다.');
      } else {
        toastOn('봉사 대기를 취소하였습니다.');
      }
    });
    onClose();
  };

  const getMessage = () => {
    if (myParticipationStatus === 'NONE') {
      if (joiningVolunteers?.length < recruitNum) {
        return '신청하려는 봉사 일정이 맞나요?';
      } else {
        return '대기 신청하려는 일정이 맞나요?';
      }
    } else if (myParticipationStatus === 'JOINING') {
      if (joiningVolunteers?.length < recruitNum) {
        return [
          '신청하신 봉사를',
          <br key="linebreak" />,
          ' 정말 취소하시겠어요?'
        ];
      } else {
        return [
          '대기 중인 봉사 일정을',
          <br key="linebreak" />,
          ' 정말 취소하시겠어요?'
        ];
      }
    }
  };

  const getButton = () => {
    if (myParticipationStatus === 'NONE') {
      if (joiningVolunteers?.length < recruitNum) {
        return (
          <Button size="small" onClick={handleParticipate}>
            <ButtonText1 color="white">신청하기</ButtonText1>
          </Button>
        );
      } else {
        return (
          <Button size="small" onClick={handleParticipate}>
            <ButtonText1 color="white">대기 신청하기</ButtonText1>
          </Button>
        );
      }
    } else if (myParticipationStatus === 'JOINING') {
      if (joiningVolunteers?.length < recruitNum) {
        return (
          <Button size="small" onClick={handleWithdraw}>
            <ButtonText1 color="white">신청 취소하기</ButtonText1>
          </Button>
        );
      } else {
        return (
          <Button size="small" onClick={handleWithdraw}>
            <ButtonText1 color="white">대기 취소하기</ButtonText1>
          </Button>
        );
      }
    }
  };

  return (
    <main>
      <H3 color="gray900" style={{ textAlign: 'center', marginTop: 20 }}>
        {getMessage()}
      </H3>
      <div className={styles.notiWrap}>
        <div className={styles.notiLine}>
          <Calendar />
          <Body2 color="gray700">{formatKoDate(startAt)}</Body2>
        </div>
        <div className={styles.notiLine}>
          <Clockmd />
          <Body2 color="gray700">
            {pmamConvert(startAt)}
            &nbsp;-&nbsp;
            {pmamConvert(endAt)}
            <br />({getDuration(startAt, endAt)})
          </Body2>
        </div>
        <div className={styles.notiLine}>
          <Profilemd />
          <Body2 color="gray700">
            {joiningVolunteers?.length}/{recruitNum}명
          </Body2>
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <Button size="small" variant="line" onClick={onClose}>
          닫기
        </Button>
        {getButton()}
      </div>
    </main>
  );
}
