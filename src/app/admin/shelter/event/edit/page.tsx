'use client';

import ChipInput from '@/components/common/ChipInput/ChipInput';
import {
  ButtonText1,
  Caption1,
  Caption2
} from '@/components/common/Typography';
import {
  AGE_LIMIT_OPTIONS,
  CATEGORY_OPTIONS,
  ITERATION_CYCLE_OPTIONS,
  IterationCycle
} from '@/constants/volunteerEvent';
import { useMemo, useRef, useState } from 'react';
import * as styles from './styles.css';
import { useForm } from 'react-hook-form';
import yup from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@/components/common/TextField/TextField';
import TextArea from '@/components/common/TextField/TextArea';
import FixedFooter from '@/components/common/FixedFooter/FixedFooter';
import Button from '@/components/common/Button/Button';
import moment from 'moment';
import getMaxOfIterationEndAt from './utils/getMaxOfIterationEndAt';
import getIterationNotice from './utils/getIterationNotice';

type ChipValues = {
  category: string;
  iterationCycle: string;
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
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [chipInput, setChipInput] = useState<ChipValues>({
    category: CATEGORY_OPTIONS[0].value,
    iterationCycle: ITERATION_CYCLE_OPTIONS[0].value,
    ageLimit: AGE_LIMIT_OPTIONS[0].value
  });
  const iterationEndAtRef = useRef<HTMLInputElement>(null);

  const handleChipInput = (name: string, value: string) => {
    setChipInput({ ...chipInput, [name]: value });
  };

  const startAt = watch('startAt');
  const iterationNotice = useMemo(() => {
    if (!startAt) return '';
    return getIterationNotice(
      startAt,
      chipInput.iterationCycle as IterationCycle
    );
  }, [startAt, chipInput.iterationCycle]);

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
        label="시작 날짜와 시간"
        type="datetime-local"
        required
        {...register('startAt')}
        error={errors.startAt}
      />
      <TextField
        label="종료 날짜와 시간"
        type="datetime-local"
        required
        {...register('endAt')}
        error={errors.endAt}
      />
      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="iterationCycle"
          color="gray600"
        >
          반복주기
        </Caption1>
        {iterationNotice && (
          <Caption2 className={styles.iterationNotice} color="primary300">
            {iterationNotice}
          </Caption2>
        )}
        <ChipInput
          name="iterationCycle"
          value={chipInput.iterationCycle}
          options={ITERATION_CYCLE_OPTIONS}
          onChange={handleChipInput}
        />
      </div>
      {chipInput.iterationCycle && (
        <TextField
          ref={iterationEndAtRef}
          name="iterationEndAt"
          label="반복 주기 종료일"
          type="date"
          min={moment().format('YYYY-MM-DD')}
          max={getMaxOfIterationEndAt()}
          defaultValue={getMaxOfIterationEndAt()}
        />
      )}
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
