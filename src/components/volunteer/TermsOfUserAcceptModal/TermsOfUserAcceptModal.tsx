'use client';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { H2 } from '@/components/common/Typography';
import * as styles from './TermsOfUserAcceptModal.css';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useHeader from '@/hooks/useHeader';

type InitTermsOfUserAcceptStateType = {
  age: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
};

interface TermsOfUserAcceptModalProps {}
export default function TermsOfUserAcceptModal({}: React.PropsWithChildren<TermsOfUserAcceptModalProps>) {
  const InitTermsOfUserAcceptState = useCallback(
    (initValue: boolean) => ({
      age: initValue,
      service: initValue,
      privacy: initValue,
      marketing: initValue
    }),
    []
  );

  const router = useRouter();

  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkList, setCheckList] = useState(InitTermsOfUserAcceptState(false));

  const setHeader = useHeader({ title: '개인봉사자로 시작하기' });

  const [isOpened, setIsOpend] = useState(false);
  useLayoutEffect(() => {
    setIsOpend(true);
  }, []);

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

  /** 버튼 disabled 설정 */
  const isDisabled = !(checkList.age && checkList.service && checkList.privacy);

  return (
    <BottomSheet
      isOpened={isOpened}
      // className={styles.bottomSheet}
    >
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
          disabled={isDisabled}
          onClick={() => {
            router.push('/volunteer/register/next');
          }}
        >
          다음
        </Button>
      </div>
    </BottomSheet>
  );
}
