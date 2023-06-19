'use client';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { H2 } from '@/components/common/Typography';
import * as styles from './TermsOfUserAcceptModal.css';
import { useCallback, useEffect, useState } from 'react';

type InitTermsOfUserAcceptStateType = {
  age: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
};

interface TermsOfUserAcceptModalProps {
  isOpened: boolean;
  onNext: () => void;
}
export default function TermsOfUserAcceptModal({
  isOpened,
  onNext
}: React.PropsWithChildren<TermsOfUserAcceptModalProps>) {
  const InitTermsOfUserAcceptState = useCallback(
    (initValue: boolean) => ({
      age: initValue,
      service: initValue,
      privacy: initValue,
      marketing: initValue
    }),
    []
  );

  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkList, setCheckList] = useState(InitTermsOfUserAcceptState(false));

  useEffect(() => {
    if (
      checkList.age &&
      checkList.service &&
      checkList.privacy &&
      checkList.marketing
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [checkList]);

  const handleCheckBoxClick = (name: keyof InitTermsOfUserAcceptStateType) => {
    setCheckList({
      ...checkList,
      [name]: !checkList[name]
    });
  };

  const isDisAbled = !(checkList.age && checkList.service && checkList.privacy);
  return (
    <BottomSheet isOpened={isOpened} className={styles.bottomSheet}>
      <div className={styles.wrapper}>
        <H2>약관에 동의해주세요</H2>
        <div className={styles.allAcceptChecBoxContainer}>
          <CheckBox
            name="all"
            value={allCheck}
            label="모두 동의"
            onClick={() => {
              setAllCheck(prev => !prev);
              setCheckList(InitTermsOfUserAcceptState(!allCheck));
            }}
          />
        </div>

        <hr className={styles.hr} />
        <section className={styles.checkBoxContainer}>
          <CheckBox
            name="age"
            value={checkList.age}
            label="(필수) 만 14세 이상 이용자입니다."
            className={styles.checkBox}
            onClick={() => {
              handleCheckBoxClick('age');
            }}
          />
          <CheckBox
            name="service"
            value={checkList.service}
            label="(필수) 서비스 이용약관에 동의"
            className={styles.checkBox}
            onClick={() => {
              handleCheckBoxClick('service');
            }}
          />
          <CheckBox
            name="privacy"
            value={checkList.privacy}
            className={styles.checkBox}
            label="(필수) 개인정보 처리방침 동의"
            onClick={() => {
              handleCheckBoxClick('privacy');
            }}
          />
          <CheckBox
            name="marketing"
            value={checkList.marketing}
            className={styles.checkBox}
            label="(선택) 마케팅 수신 동의"
            onClick={() => {
              handleCheckBoxClick('marketing');
            }}
          />
        </section>
        <Button
          className={styles.bottomButton}
          disabled={isDisAbled}
          onClick={() => {
            onNext();
            console.log(checkList);
          }}
        >
          다음
        </Button>
      </div>
    </BottomSheet>
  );
}
