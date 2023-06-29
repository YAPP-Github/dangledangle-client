import { ObservationAnimalPayload } from '@/api/shelter/admin/observation-animal';
import useCreateObservationAnimal from '@/api/shelter/admin/useCreateObservationAnimal';
import Button from '@/components/common/Button/Button';
import Modal, { ModalProps } from '@/components/common/Modal/Modal';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import RadioButton from '@/components/common/RadioButton/RadioButton';
import TextArea from '@/components/common/TextField/TextArea';
import TextField from '@/components/common/TextField/TextField';
import { ButtonText1 } from '@/components/common/Typography';
import { AnimalGender } from '@/constants/animal';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useUpdateObservationAnimal from '@/api/shelter/admin/useUpdateObservationAnimal';
import useImageUploader from '@/hooks/useImageUploader';
import { usePresence } from 'framer-motion';
import yup from '@/utils/yup';
import * as styles from './AnimalFormDialog.css';
import { ObservationAnimal } from '@/types/shelter';
interface AnimalFormDialogProps extends Pick<ModalProps, 'open' | 'onClose'> {
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

interface AnimalFormProps {
  initialData?: ObservationAnimal;
  onClose: () => void;
}

export const AnimalForm: React.FC<AnimalFormProps> = ({
  onClose = () => null,
  initialData
}) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(scheme)
  });

  const {
    onChangeImage,
    isUploading,
    src: profileImageUrl,
    setSrc: setProfileImageUrl
  } = useImageUploader();

  const { mutateAsync: create } = useCreateObservationAnimal();
  const { mutateAsync: update } = useUpdateObservationAnimal();
  const [isPresent, safeToRemove] = usePresence();

  const handleClose = useCallback(() => {
    reset({});
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (isPresent) {
      trigger('gender');
    } else {
      safeToRemove();
    }
  }, [isPresent, safeToRemove, trigger]);

  useEffect(() => {
    reset(initialData || {});
    setProfileImageUrl(initialData?.profileImageUrl);
    if (initialData) trigger();

    return () => {
      reset({});
      setProfileImageUrl('');
    };
  }, [initialData, reset, setProfileImageUrl, trigger]);

  const submitable = Boolean(
    !isUploading && isEmpty(errors) && profileImageUrl
  );

  const onSubmit = useCallback(
    (data: FormValues) => {
      if (!submitable || !profileImageUrl) return;
      const payload: ObservationAnimalPayload = {
        images: [profileImageUrl],
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
    [submitable, profileImageUrl, initialData, update, handleClose, create]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        imagePath={profileImageUrl}
        name="image"
        variant="square"
        onChangeCallback={onChangeImage}
      />

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
        maxLength={300}
        height="88px"
        placeholder="특이사항을 입력해주세요"
        {...register('specialNote')}
        error={errors.specialNote}
      />
      <Button
        style={{ marginTop: '20px' }}
        itemType="submit"
        disabled={!submitable}
      >
        등록하기
      </Button>
    </form>
  );
};

const AnimalFormDialog: React.FC<AnimalFormDialogProps> = ({
  open,
  onClose,
  initialData
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <AnimalForm initialData={initialData} onClose={onClose} />
    </Modal>
  );
};

export default AnimalFormDialog;
