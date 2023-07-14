'use client';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import { useState } from 'react';
import EditMenu from '@/components/shelter-edit/EditMenu/EditMenu';
import Badge from '@/components/common/Badge/Badge';
import Divider from '@/components/common/Divider/Divider';
import { H4 } from '@/components/common/Typography';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';
import * as styles from './styles.css';
import AnimalFormDialog from '@/components/shelter-edit/AnimalFormDialog/AnimalFormDialog';
import useBooleanState from '@/hooks/useBooleanState';
import useDialog from '@/hooks/useDialog';
import useToast from '@/hooks/useToast';
import useDeleteObservationAnimal from '@/api/shelter/admin/useDeleteObservationAnimal';
import useObservationAnimalList from '@/api/shelter/admin/useObservationAnimalList';
import useShelterInfo from '@/api/shelter/admin/useShelterInfo';
import { OUT_LINK_TYPE } from '@/constants/shelter';
import useImageUploader from '@/hooks/useImageUploader';
import useUpdateImage from '@/api/shelter/admin/useUpdateImage';
import useHeader from '@/hooks/useHeader';
import { ObservationAnimal, ShelterAdditionalInfo } from '@/types/shelter';
import FixedFooter from '@/components/common/FixedFooter/FixedFooter';
import RegisterComplete from '@/app/shelter/register/components/RegisterComplete';

export default function ShelterEditPage() {
  useHeader({ title: '보호소 정보' });
  const { onChangeImage, isUploading } = useImageUploader();
  const [uploadError, setUploadError] = useState<boolean>(false);
  const router = useRouter();

  const [isOpened, openDialog, closeDialog] = useBooleanState(false);
  const { dialogOn, dialogOff, setDialogLoading } = useDialog();
  const toastOn = useToast();
  const [targetAnimal, setTargetAnimal] = useState<ObservationAnimal>();
  const [registerCompleted, setRegisterCompleted] = useState<Boolean>(false);

  const animalsQuery = useObservationAnimalList();
  const shelterQuery = useShelterInfo();
  const { mutateAsync: deleteAnimal } = useDeleteObservationAnimal();
  const { mutateAsync: updateImage } = useUpdateImage();

  const handleChangeImage = (fileData?: File) => {
    onChangeImage(fileData, async url => {
      try {
        if (!url) throw Error();
        await updateImage(url);
      } catch {
        setUploadError(true);
        shelterQuery.refetch();
      }
    });
  };

  const handleClickDeleteAnimal = (observationAnimalId: number) => {
    dialogOn({
      message: '등록하신 동물 정보를<br/>정말 삭제하시겠습니까?',
      close: {},
      confirm: {
        text: '삭제',
        onClick: () => {
          setDialogLoading(true);
          deleteAnimal({ observationAnimalId }).then(() => {
            dialogOff();
            toastOn('동물 정보가 삭제되었습니다.');
          });
        }
      }
    });
  };

  const handleClickEdit = (idx: number) => {
    if (animalsQuery.data) {
      setTargetAnimal(animalsQuery.data[idx]);
      openDialog();
    }
  };

  const handleClickCreate = () => {
    setTargetAnimal(undefined);
    openDialog();
  };

  const isAddtionalInfoCompleted = (info: ShelterAdditionalInfo) => {
    if (info.outLinks.length !== Object.keys(OUT_LINK_TYPE).length)
      return false;
    return !Object.values(info).includes(null);
  };

  const handleClickCompleteRegister = () => {
    setRegisterCompleted(true);
  };

  const MenuBadge = (isCompleted: boolean) => (
    <Badge type={isCompleted ? 'primary' : 'gray'}>
      {isCompleted ? '입력 완료' : '미입력'}
    </Badge>
  );

  if (registerCompleted) {
    return <RegisterComplete />;
  }

  return (
    <div className="page">
      <section className={styles.imageSection}>
        <ImageUploader
          imagePath={shelterQuery?.data?.profileImageUrl}
          name="image"
          onChangeCallback={handleChangeImage}
          placeholder="대표 사진"
          loading={isUploading}
          error={uploadError}
        />
      </section>
      <section>
        <EditMenu
          title="필수 정보"
          caption="보호소 이름 / 연락처 / 주소 / 소개문구"
          titleSuffix={MenuBadge(true)}
          onClick={() => router.push(location.pathname + '/required')}
        />
        <Divider spacing={18} />
        <EditMenu
          title="추가 정보"
          caption="SNS계정 / 후원 계좌 정보 / 주차 정보 / 사전 안내사항"
          titleSuffix={MenuBadge(
            shelterQuery.isSuccess &&
              isAddtionalInfoCompleted(shelterQuery.data)
          )}
          onClick={() => router.push(location.pathname + '/extra')}
        />
        <Divider spacing={18} />
      </section>
      <section>
        <EditMenu
          title="특별 케어 동물"
          caption="돌발행동이나 건강상태 등을 미리 유의해야하는 동물 친구가 있다면 봉사자에게 미리 알려주세요."
          titleSuffix={
            <H4
              color={
                animalsQuery.data && animalsQuery.data.length > 0
                  ? 'primary300'
                  : 'gray400'
              }
            >
              {animalsQuery.data?.length || 0}
            </H4>
          }
        />
        <Button
          style={{ marginTop: '12px' }}
          variant="line"
          prefixIcon="plus"
          onClick={handleClickCreate}
        >
          동물 추가하기
        </Button>
        {animalsQuery.isSuccess && (
          <div className={styles.animalList}>
            {animalsQuery.data.map((animal, idx) => (
              <AnimalCard
                key={animal.id}
                data={animal}
                mode="edit"
                onClickEdit={() => handleClickEdit(idx)}
                onClickDelete={() => handleClickDeleteAnimal(animal.id)}
              />
            ))}
          </div>
        )}
        {typeof window !== 'undefined' &&
          window.location.hash === '#register' && (
            <FixedFooter>
              <Button onClick={handleClickCompleteRegister}>
                가입 완료하기
              </Button>
            </FixedFooter>
          )}
        <AnimalFormDialog
          initialData={targetAnimal}
          open={isOpened}
          onClose={closeDialog}
        />
      </section>
    </div>
  );
}
