'use client';

import { ObservationAnimal } from '@/api/shelter/observation-animal';
import useCreateObservationAnimal from '@/api/shelter/useCreateObservationAnimal';
import Button from '@/components/common/Button/Button';
import ConfirmDialog, {
  ConfirmDialogProps
} from '@/components/common/CofirmDialog/ConfirmDialog';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import RadioButton from '@/components/common/RadioButton/RadioButton';
import TextArea from '@/components/common/TextField/TextArea';
import TextField from '@/components/common/TextField/TextField';
import { ButtonText1 } from '@/components/common/Typography';
import { AnimalGender } from '@/constants/animal';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
interface AnimalFormDialogProps
  extends Pick<ConfirmDialogProps, 'open' | 'onClose'> {
  data?: ObservationAnimal;
}

type FormValues = {
  name: string;
  breed: string;
  age: number;
  gender: AnimalGender;
  specialNote: string;
};

export const genderOptions: Array<{ value: AnimalGender; label: string }> = [
  {
    label: '여아',
    value: 'FEMALE'
  },
  {
    label: '남아',
    value: 'MALE'
  }
];

const scheme: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup.string().required(),
  breed: yup.string().required(),
  age: yup.number().integer().min(0).required(),
  gender: yup.string().oneOf(['FEMALE', 'MALE']).required(),
  specialNote: yup.string().max(300).required()
});

const AnimalFormDialog: React.FC<AnimalFormDialogProps> = ({
  open,
  onClose
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(scheme)
  });

  const { mutateAsync } = useCreateObservationAnimal();

  const [imagePath, setImagePath] = useState(
    'https://newsimg-hams.hankookilbo.com/2022/05/19/624e4207-9ee4-46db-ab65-76cc882eb4c2.jpg'
  );

  const onSubmit = useCallback(
    (data: FormValues) => {
      console.log('🔸 → onSubmit → data:', data);
      const payload = {
        ...data,
        images: [imagePath]
      };
      mutateAsync({ payload }).then(console.log);
    },
    [imagePath, mutateAsync]
  );

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
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
          error={errors['name']}
        />
        <TextField
          label="견종"
          placeholder="견종을 입력해주세요"
          {...register('breed')}
          error={errors['breed']}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              width: '30%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              label="나이"
              placeholder="나이"
              {...register(`age`)}
              error={errors['age']}
            />
            <ButtonText1 style={{ marginTop: 20 }}>살</ButtonText1>
          </div>
          <div>
            <RadioButton
              style={{ marginBottom: '12px' }}
              label="성별"
              options={genderOptions}
              {...register('gender')}
            />
          </div>
        </div>
        <TextArea
          label="상세 주의 사항"
          max={300}
          height="150px"
          placeholder="특이사항을 입력해주세요"
          {...register('specialNote')}
          error={errors['specialNote']}
        />
      </form>
    </ConfirmDialog>
  );
};

export default AnimalFormDialog;
