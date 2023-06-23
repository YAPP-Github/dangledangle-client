import { Question, Warning } from '@/asset/icons';
import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import EmphasizedTitle, {
  E,
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { Body3, Body4, H2, H4 } from '@/components/common/Typography';
import { useState } from 'react';
import { onNextProps } from '../page';
import * as styles from './../styles.css';

export default function Sure({ onNext }: onNextProps) {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className={styles.titleWrapper} style={{ marginBottom: '63px' }}>
        <EmphasizedTitle>
          <Line>
            <H2>
              <E>보호소 파트너</E>로
            </H2>
          </Line>
          <H2>가입하시는 것이 맞는지</H2>
          <H2>꼭 확인해주세요.</H2>
        </EmphasizedTitle>
      </div>

      <div className={styles.subWrapper}>
        <Question />
        <H4>보호소 파트너란?</H4>
      </div>

      <div className={styles.content}>
        <div style={{ padding: '16px' }}>
          <Body3>시보호소 또는 민간보호소를 운영하는</Body3>
          <div style={{ display: 'flex' }}>
            <Body4>운영자, 관계자분들을 대상</Body4>
            <Body3>으로해요.</Body3>
          </div>
        </div>
      </div>

      <div className={styles.subWrapper} style={{ marginTop: '33px' }}>
        <Warning />
        <H4>주의해주세요.</H4>
      </div>

      <div className={styles.content} style={{ marginBottom: '116px' }}>
        <div style={{ padding: '16px' }}>
          <Body3>OO운영자가 확인했을 때 시보호소/민간 보호소</Body3>
          <Body3>관계자가 아닌, 개인 구조자, 분양 홍보자 등일 경우</Body3>
          <div style={{ display: 'flex' }}>
            <Body3>임의로 해당&nbsp;</Body3>
            <Body4>계정을 사용 중지 처리할 수 있어요.</Body4>
          </div>
        </div>
      </div>

      <div className={styles.check}>
        <CheckBox
          value={checked}
          onClick={setChecked}
          label="위 내용을 모두 확인했으며, 동의해요."
        />
      </div>
      <Button
        onClick={onNext}
        disabled={!checked}
        style={{ marginTop: '22px' }}
      >
        다음
      </Button>
    </>
  );
}
