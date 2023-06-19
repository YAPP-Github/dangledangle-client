import Button from '@/components/common/Button/Button';
import React, { useState } from 'react';
import { onNextProps } from '../page';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2, H3 } from '@/components/common/Typography';
import TextField from '@/components/common/TextField/TextField';
import { useFormContext } from 'react-hook-form';
import useBooleanState from '@/hooks/useBooleanState';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import CheckBox from '@/components/common/CheckBox/CheckBox';

type SingleCheckedKeys = 'over14' | 'terms' | 'privacy' | 'marketing';
type SingleCheckedState = Record<SingleCheckedKeys, boolean>;

export default function Account({ onNext }: onNextProps) {
  const [isSheet, isOpenSheet, isCloseSheet] = useBooleanState();
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const [allChecked, setAllChecked] = useState(false);
  const [singleChecked, setsingleChecked] = useState<SingleCheckedState>({
    over14: false,
    terms: false,
    privacy: false,
    marketing: false
  });

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
    setsingleChecked({
      over14: !allChecked,
      terms: !allChecked,
      privacy: !allChecked,
      marketing: !allChecked
    });
  };

  const handleSingleChecked = (key: keyof SingleCheckedState) => {
    setsingleChecked({
      ...singleChecked,
      [key]: !singleChecked[key]
    });
  };

  const isButtonDisabled =
    !singleChecked.over14 || !singleChecked.terms || !singleChecked.privacy;

  return (
    <>
      <div style={{ padding: '20px' }}>
        <div
          style={{
            marginTop: '40px',
            marginBottom: '124px'
          }}
        >
          <EmphasizedTitle>
            <H2>파트너 활동을 위한</H2>
            <H2>계정을 생성해주세요.</H2>
          </EmphasizedTitle>
        </div>
        <TextField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          {...register('email')}
          error={errors['email']}
        />
        <TextField
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자 2가지 조합 8~15자"
          {...register('password')}
          error={errors['password']}
        />
        <TextField
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요."
          {...register('passwordConfirm')}
          error={errors['passwordConfirm']}
        />
        <Button onClick={isOpenSheet} style={{ marginTop: '47px' }}>
          다음
        </Button>
      </div>
      <BottomSheet isOpened={isSheet} onClose={isCloseSheet}>
        <H2>약관에 동의해주세요.</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              columnGap: '10px',
              marginTop: '32px',
              marginBottom: '41px'
            }}
          >
            <CheckBox value={allChecked} onClick={handleAllChecked} />
            <H3>모두 동의</H3>
          </div>
          <CheckBox
            value={singleChecked.over14}
            onClick={() => handleSingleChecked('over14')}
            label="(필수) 만 14세 이상 이용입니다."
          />

          <CheckBox
            value={singleChecked.terms}
            onClick={() => handleSingleChecked('terms')}
            label="(필수) 서비스 이용약관에 동의"
          />
          <CheckBox
            value={singleChecked.privacy}
            onClick={() => handleSingleChecked('privacy')}
            label="(필수) 개인정보 처리방침 동의"
          />
          <CheckBox
            value={singleChecked.marketing}
            onClick={() => handleSingleChecked('marketing')}
            label="(선택) 마케팅 수신 동의"
          />
        </div>
        <Button
          disabled={isButtonDisabled}
          onClick={onNext}
          style={{ marginTop: '101px' }}
        >
          회원가입
        </Button>
      </BottomSheet>
    </>
  );
}
