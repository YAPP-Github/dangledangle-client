import { ObservationAnimalPayload } from '@/api/shelter/admin/observation-animal';
import useCreateObservationAnimal from '@/api/shelter/admin/useCreateObservationAnimal';
import Button from '@/components/common/Button/Button';
import Modal, { ModalProps } from '@/components/common/Modal/Modal';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import RadioButton from '@/components/common/RadioButton/RadioButton';
import TextArea from '@/components/common/TextField/TextArea';
import TextField from '@/components/common/TextField/TextField';
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
import useBooleanState from '@/hooks/useBooleanState';
interface AnimalFormDialogProps extends Pick<ModalProps, 'open' | 'onClose'> {
  initialData?: ObservationAnimal;
  data?: ObservationAnimal;
}

type FormValues = {
  name: string;
  breed?: string | null;
  age?: string | null;
  gender?: string | null;
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

const schema: yup.ObjectSchema<FormValues> = yup
  .object()
  .shape({
    name: yup.string().required(),
    breed: yup.string().nullable(),
    age: yup.string().nullable(),
    gender: yup.string().nullable(),
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
    watch,
    setFocus,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
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
  const [isSubmitting, startSubmit] = useBooleanState(false);

  const handleClose = useCallback(() => {
    reset({});
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (isPresent) {
      setFocus('name');
      if (initialData) {
        reset(initialData);
        setProfileImageUrl(initialData.profileImageUrl || undefined);
      }
    } else {
      safeToRemove();
    }
  }, [
    initialData,
    isPresent,
    reset,
    safeToRemove,
    setFocus,
    setProfileImageUrl
  ]);

  useEffect(() => {
    return () => {
      reset({});
      setProfileImageUrl(undefined);
    };
  }, [reset, setProfileImageUrl]);

  const specialNote = watch('specialNote');
  const submittable = Boolean(!isUploading && isEmpty(errors) && specialNote);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!submittable) return;
      startSubmit();
      const payload: ObservationAnimalPayload = {
        images: profileImageUrl ? [profileImageUrl] : [],
        name: data.name,
        age: data.age || null,
        gender: (data.gender as AnimalGender) || null,
        breed: data.breed || null,
        specialNote: data.specialNote
      };

      if (initialData) {
        await update({ observationAnimalId: initialData.id, payload });
      } else {
        await create({ payload });
      }
      handleClose();
    },
    [
      submittable,
      startSubmit,
      profileImageUrl,
      initialData,
      handleClose,
      update,
      create
    ]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        name="image"
        imagePath={profileImageUrl}
        style={{ alignSelf: 'center' }}
        shape="square"
        defaultImage="puppy"
        size="80"
        onChangeCallback={onChangeImage}
      />

      <TextField
        label="이름"
        placeholder="이름을 입력해주세요"
        required
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
        </div>
        <div>
          <RadioButton
            style={{ marginBottom: '12px' }}
            label="성별"
            options={genderOptions}
            initailValue={initialData?.gender || undefined}
            {...register('gender')}
          />
        </div>
      </div>
      <TextArea
        label="특이사항"
        required
        maxLength={300}
        height="88px"
        placeholder="특이사항을 입력해주세요"
        {...register('specialNote')}
        error={errors.specialNote}
      />
      <Button
        style={{ marginTop: '20px' }}
        itemType="submit"
        disabled={!submittable}
        loading={isSubmitting}
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
