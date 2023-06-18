'use client';

import Button from '@/components/common/Button/Button';
import ConfirmDialog from '@/components/common/CofirmDialog/ConfirmDialog';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import RadioButton from '@/components/common/RadioButton/RadioButton';
import { RadioOption } from '@/components/common/RadioGroup/RadioGroup';
import TextArea from '@/components/common/TextArea/TextArea';
import TextField from '@/components/common/TextField/TextField';
import { ButtonText1 } from '@/components/common/Typography';
import useBooleanState from '@/hooks/useBooleanState';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { aniValidation } from './utils/aniValidation';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';

export interface Animal {
  image: string;
  name: string;
  specipic: string;
  age: number;
  gender: string;
  special_note: string;
}

const parkingOptions: RadioOption[] = [
  {
    label: '여아',
    value: '여아'
  },
  {
    label: '남아',
    value: '남아'
  }
];

export default function AnimalPage() {
  const [isDialog, isOpenDialog, isCloseDialog] = useBooleanState();
  const methods = useForm<Animal>({
    mode: 'all',
    reValidateMode: 'onChange'
    // resolver: yupResolver(aniValidation)
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    isCloseDialog();
  };

  useEffect(() => {
    setError('name', { type: 'focus' }, { shouldFocus: true });
    setError('special_note', { type: 'focus' }, { shouldFocus: true });
    setError('specipic', { type: 'focus' }, { shouldFocus: true });
    setError('age', { type: 'focus' }, { shouldFocus: true });
    setError('gender', { type: 'focus' }, { shouldFocus: true });
  }, [setError]);

  return (
    <main>
      <Button onClick={isOpenDialog}>모달 열기</Button>

      <ConfirmDialog
        open={isDialog}
        onClose={isCloseDialog}
        actionButton={
          <Button onClick={handleSubmit(onSubmit)} disabled={!isEmpty(errors)}>
            등록하기
          </Button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader name="image" help variant="square" />

          <TextField
            label="이름"
            placeholder="이름을 입력해주세요"
            {...register(`name`)}
          />
          <TextField
            label="견종"
            placeholder="견종을 입력해주세요"
            {...register(`specipic`)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                width: '30%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <TextField label="나이" placeholder="나이" {...register(`age`)} />
              <ButtonText1 style={{ marginTop: 20 }}>살</ButtonText1>
            </div>
            <div>
              <RadioButton
                style={{ marginBottom: '12px' }}
                label="성별"
                options={parkingOptions}
                {...register('gender')}
              />
            </div>
          </div>
          <TextArea
            label="상세 주의 사항"
            max={300}
            fixHeight="150px"
            placeholder="특이사항을 입력해주세요"
            {...register(`special_note`)}
          />
        </form>
      </ConfirmDialog>

      <article
        style={{
          backgroundColor: '#F2F1ED',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {/* {mock.map((animal, index) => (
          <AnimalCard key={index} data={animal} />
        ))} */}
      </article>
    </main>
  );
}

const mock: Animal[] = [
  {
    image: '',
    name: '인절미',
    specipic: '비글',
    age: 3,
    gender: '여아',
    special_note:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  },
  {
    image: '',
    name: '홍시',
    specipic: '비글',
    age: 3,
    gender: '여아',
    special_note:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  }
];
