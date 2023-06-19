'use client';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import { useCallback, useState } from 'react';
import EditMenu from '@/components/shelter-edit/EditMenu/EditMenu';
import Badge from '@/components/common/Badge/Badge';
import Divider from '@/components/common/Divider/Divider';
import { H4 } from '@/components/common/Typography';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import useObservationAnimalList from '@/api/shelter/useObservationAnimalList';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';
import * as styles from './styles.css';
import AnimalFormDialog from '@/components/shelter-edit/AnimalFormDialog/AnimalFormDialog';
import useBooleanState from '@/hooks/useBooleanState';
import useDeleteObservationAnimal from '@/api/shelter/useDeleteObservationAnimal';
import useDialog from '@/hooks/useDialog';

export default function ShelterEditPage() {
  const [imagePath, setImagePath] = useState<string>('');
  const router = useRouter();
  const { data: animalList, isSuccess } = useObservationAnimalList();
  const { mutateAsync: deleteAnimal } = useDeleteObservationAnimal();
  const [isOpened, openDialog, closeDialog] = useBooleanState(false);
  const { dialogOn } = useDialog();

  const handleChangeImage = useCallback((fileData?: File) => {
    if (!fileData) setImagePath('');
  }, []);

  const handleDeleteAnimal = (observationAnimalId: number) => {
    // deleteAnimal({ observationAnimalId }).then(() => {
    //   window.alert('삭제');
    // });
    dialogOn({
      message: '등록하신 동물 정보를<br/>정말 삭제하시겠습니까?',
      close: {
        text: '취소'
      },
      confirm: {
        text: '삭제'
      }
    });
  };

  return (
    <>
      <section>
        <ImageUploader
          imagePath={imagePath}
          name="image"
          onChangeCallback={handleChangeImage}
          placeholder="대표 사진"
        />
      </section>
      <section>
        <EditMenu
          title="필수 정보"
          caption="보호소 이름 / 연락처 / 주소 / 소개문구"
          titleSuffix={<Badge type="primary">입력완료</Badge>}
          onClick={() => router.push(location.pathname + '/required')}
        />
        <Divider spacing={18} />
        <EditMenu
          title="추가 정보"
          caption="SNS계정 / 후원 계좌 정보 / 주차 정보 / 사전 안내사항"
          titleSuffix={<Badge type="gray">미입력</Badge>}
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
                animalList && animalList.length > 0 ? 'primary300' : 'gray400'
              }
            >
              {animalList?.length || 0}
            </H4>
          }
        />
        <Button
          style={{ marginTop: '12px' }}
          variant="line"
          prefixIcon="plus"
          onClick={openDialog}
        >
          동물 추가하기
        </Button>
        {isSuccess && (
          <div className={styles.animalList}>
            {animalList.map(animal => (
              <AnimalCard
                key={animal.id}
                data={animal}
                onClickEdit={openDialog}
                onClickDelete={() => handleDeleteAnimal(animal.id)}
              />
            ))}
          </div>
        )}
        <AnimalFormDialog open={isOpened} onClose={closeDialog} />
      </section>
    </>
  );
}
