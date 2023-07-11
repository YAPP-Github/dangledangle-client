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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { isEmpty } from 'lodash';
import { formatDatetimeForServer } from '@/utils/timeConvert';

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
  iterationEndAt?: Date;
};

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().max(300).optional(),
  recruitNum: yup.number().min(1, '').required(''),
  startAt: yup
    .date()
    .default(() => new Date())
    .required(),
  endAt: yup
    .date()
    .min(yup.ref('startAt'), '종료 시간은 시작 시간보다 앞에 올 수 없습니다.')
    .required(),
  iterationEndAt: yup
    .date()
    .min(
      yup.ref('endAt'),
      '반복주기 종료일은 종료 시간보다 앞에 올 수 없습니다.'
    )
});

export default function ShelterEventEditPage() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    resetField,
    formState: { errors, isDirty }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });
  const startAt = watch('startAt');
  const endAt = watch('endAt');
  const [chipInput, setChipInput] = useState<ChipValues>({
    category: CATEGORY_OPTIONS[0].value,
    iterationCycle: ITERATION_CYCLE_OPTIONS[0].value,
    ageLimit: AGE_LIMIT_OPTIONS[0].value
  });
  const [submittable, setSubmittable] = useState(false);
  const minStartAt = useMemo(
    () =>
      formatDatetimeForServer(
        moment().set({ minutes: 0, second: 0 }),
        'DATETIME'
      ),
    []
  );
  const minIterationEndAt = useMemo(
    () => formatDatetimeForServer(moment(endAt).add(1, 'day'), 'DATE'),
    [endAt]
  );

  const handleChangeDate = () => {
    trigger(['startAt', 'endAt', 'iterationEndAt']);
  };

  const handleChipInput = (name: string, value: string) => {
    setChipInput({ ...chipInput, [name]: value });
  };

  const iterationNotice = useMemo(() => {
    if (!startAt) return '';
    return getIterationNotice(
      startAt,
      chipInput.iterationCycle as IterationCycle
    );
  }, [startAt, chipInput.iterationCycle]);

  useEffect(() => {
    if (!chipInput.iterationCycle) {
      resetField('iterationEndAt');
    } else {
      trigger('iterationEndAt');
    }
  }, [chipInput.iterationCycle, resetField, trigger]);

  useEffect(() => {
    if (!isDirty || !isEmpty(errors)) {
      setSubmittable(false);
    } else {
      setSubmittable(true);
    }
  }, [errors, isDirty]);

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
        min={minStartAt}
        {...register('startAt', { onChange: handleChangeDate })}
        error={errors.startAt}
      />
      <TextField
        label="종료 날짜와 시간"
        type="datetime-local"
        required
        {...register('endAt', { onChange: handleChangeDate })}
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
          label="반복 주기 종료일"
          type="date"
          min={minIterationEndAt}
          max={getMaxOfIterationEndAt()}
          defaultValue={getMaxOfIterationEndAt()}
          {...register('iterationEndAt', { onChange: handleChangeDate })}
          error={errors.iterationEndAt}
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
        <Button disabled={!submittable} itemType="submit">
          일정 만들기
        </Button>
      </FixedFooter>
    </form>
  );
}
