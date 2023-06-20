'use client';

import {
  ObservationAnimal,
  ObservationAnimalPayload
} from '@/api/shelter/admin/observation-animal';
import useCreateObservationAnimal from '@/api/shelter/admin/useCreateObservationAnimal';
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
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useUpdateObservationAnimal from '@/api/shelter/admin/useUpdateObservationAnimal';
interface AnimalFormDialogProps
  extends Pick<ConfirmDialogProps, 'open' | 'onClose'> {
  initialData?: ObservationAnimal;
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

const scheme: yup.ObjectSchema<FormValues> = yup
  .object()
  .shape({
    name: yup.string().required(),
    breed: yup.string().required(),
    age: yup.number().integer().min(0).required(),
    gender: yup.string().oneOf(['FEMALE', 'MALE']).required(),
    specialNote: yup.string().max(300).required()
  })
  .required();

const AnimalFormDialog: React.FC<AnimalFormDialogProps> = ({
  open,
  onClose,
  initialData
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(scheme)
  });
  const [imagePath, setImagePath] = useState(
    'https://dangledangle-image-storage.s3.ap-northeast-2.amazonaws.com/dev/images/2023-06-18-1687091178705.webp'
  );

  const { mutateAsync: create } = useCreateObservationAnimal();
  const { mutateAsync: update } = useUpdateObservationAnimal();

  useEffect(() => {
    reset(initialData || {});
    setImagePath(initialData?.profileImageUrl || '');

    return () => {
      reset({});
    };
  }, [initialData, reset]);

  const handleClose = useCallback(() => {
    reset({});
    setTimeout(onClose, 0);
  }, [onClose, reset]);

  const onSubmit = useCallback(
    (data: FormValues) => {
      console.log('🔸 → onSubmit → data:', data);
      const payload: ObservationAnimalPayload = {
        images: [imagePath],
        name: data.name,
        age: data.age,
        gender: data.gender,
        breed: data.breed,
        specialNote: data.specialNote
      };

      if (initialData)
        update({ observationAnimalId: initialData.id, payload }).then(
          handleClose
        );
      else create({ payload }).then(handleClose);
    },
    [create, imagePath, initialData, handleClose, update]
  );

  return (
    <ConfirmDialog
      open={open}
      onClose={handleClose}
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
          error={errors.name}
        />
        <TextField
          label="견종"
          placeholder="견종을 입력해주세요"
          {...register('breed')}
          error={errors.breed}
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
              error={errors.age}
            />
            <ButtonText1 style={{ marginTop: 20 }}>살</ButtonText1>
          </div>
          <div>
            <RadioButton
              style={{ marginBottom: '12px' }}
              label="성별"
              options={genderOptions}
              initailValue={initialData?.gender}
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
          error={errors.specialNote}
        />
      </form>
    </ConfirmDialog>
  );
};

export default AnimalFormDialog;
