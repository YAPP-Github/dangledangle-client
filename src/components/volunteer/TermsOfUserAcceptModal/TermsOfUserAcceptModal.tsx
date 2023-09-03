'use client';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import { ButtonText2, H2 } from '@/components/common/Typography';
import * as styles from './TermsOfUserAcceptModal.css';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useHeader from '@/hooks/useHeader';
import { VOLUNTEER_REDIRECT_PATH_REGISTER } from '@/app/register/volunteer/[...slug]/CurrentComponentTypes';
import { URL_PRIVACY_POLICY, URL_TERMS_OF_USE } from '@/constants/landingURL';

type InitTermsOfUserAcceptStateType = {
  age: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
};

interface TermsOfUserAcceptModalProps {}
export default function TermsOfUserAcceptModal({}: React.PropsWithChildren<TermsOfUserAcceptModalProps>) {
  const initTermsOfUserAcceptState = useCallback(
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
  const [checkList, setCheckList] = useState(initTermsOfUserAcceptState(false));

  useHeader({ title: '개인봉사자로 시작하기' });

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
              setCheckList(initTermsOfUserAcceptState(!allCheck));
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
          <div className={styles.checkBox}>
            <CheckBox
              name="service"
              value={checkList.service}
              label="(필수) 서비스 이용약관에 동의"
              onClick={() => {
                handleCheckBoxClick('service');
              }}
            />
            <ButtonText2
              color="gray400"
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.preventDefault();
                window.open(URL_TERMS_OF_USE);
              }}
            >
              보기
            </ButtonText2>
          </div>
          <div className={styles.checkBox}>
            <CheckBox
              name="privacy"
              value={checkList.privacy}
              label="(필수) 개인정보 처리방침 동의"
              onClick={() => {
                handleCheckBoxClick('privacy');
              }}
            />
            <ButtonText2
              color="gray400"
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.preventDefault();
                window.open(URL_PRIVACY_POLICY);
              }}
            >
              보기
            </ButtonText2>
          </div>

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
            router.push(`${VOLUNTEER_REDIRECT_PATH_REGISTER}/nickname`);
          }}
        >
          다음
        </Button>
      </div>
    </BottomSheet>
  );
}
