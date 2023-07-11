'use client';

import ChipInput from '@/components/common/ChipInput/ChipInput';
import { ButtonText1, Caption1 } from '@/components/common/Typography';
import {
  AGE_LIMIT_OPTIONS,
  CATEGORY_OPTIONS,
  ITERATION_CYCLE_OPTIONS
} from '@/constants/volunteerEvent';
import { useState } from 'react';
import * as styles from './styles.css';
import { useForm } from 'react-hook-form';
import yup from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@/components/common/TextField/TextField';
import TextArea from '@/components/common/TextField/TextArea';
import FixedFooter from '@/components/common/FixedFooter/FixedFooter';
import Button from '@/components/common/Button/Button';

type ChipValues = {
  category: string;
  cycle: string;
  ageLimit: string;
};

type FormValues = {
  title: string;
  description?: string;
  recruitNum: number;
  startAt: Date;
  endAt: Date;
};

const schema: yup.ObjectSchema<FormValues> = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().max(300).optional(),
    recruitNum: yup.number().min(1, '').required(''),
    startAt: yup.date().required(),
    endAt: yup.date().required()
  })
  .required();

export default function ShelterEventEditPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [chipInput, setChipInput] = useState<ChipValues>({
    category: CATEGORY_OPTIONS[0].value,
    cycle: ITERATION_CYCLE_OPTIONS[0].value,
    ageLimit: AGE_LIMIT_OPTIONS[0].value
  });

  const handleChipInput = (name: string, value: string) => {
    setChipInput({ ...chipInput, [name]: value });
  };

  const onSubmit = (value: FormValues) => {
    console.log('🔸 → onSubmit → value:', value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="cateogry"
          color="gray600"
        >
          카테고리
        </Caption1>
        <ChipInput
          name="category"
          value={chipInput.category}
          options={CATEGORY_OPTIONS}
          onChange={handleChipInput}
        />
      </div>
      <TextField
        label="일정 제목"
        placeholder="일정 제목을 입력해주세요"
        required
        {...register('title')}
        error={errors.title}
      />
      <TextArea
        label="일정 소개"
        placeholder="봉사 일정에 대한 설명을 작성해주세요."
        {...register('description')}
        error={errors.description}
        height="128px"
        maxLength={300}
      />
      <TextField
        label="날짜와 시간"
        type="datetime-local"
        placeholder="일정 제목을 입력해주세요"
        required
        {...register('startAt')}
        error={errors.startAt}
      />
      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="cycle"
          color="gray600"
        >
          반복주기
        </Caption1>
        <ChipInput
          name="cycle"
          value={chipInput.cycle}
          options={ITERATION_CYCLE_OPTIONS}
          onChange={handleChipInput}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          label="참가 정원"
          type="number"
          placeholder="ex) 10"
          pattern="[0-9]+"
          min={0}
          width="60px"
          required
          useClearButton={false}
          {...register('recruitNum', {
            setValueAs: value => Number(value),
            min: 0
          })}
          error={errors.recruitNum}
        />
        <ButtonText1 style={{ marginTop: 20 }}>살</ButtonText1>
      </div>

      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="ageLimit"
          color="gray600"
        >
          연령 조건
        </Caption1>
        <ChipInput
          name="ageLimit"
          value={chipInput.ageLimit}
          options={AGE_LIMIT_OPTIONS}
          onChange={handleChipInput}
        />
      </div>

      <FixedFooter>
        <Button itemType="submit">일정 만들기</Button>
      </FixedFooter>
    </form>
  );
}
