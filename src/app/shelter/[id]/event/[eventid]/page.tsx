'use client';

import useDeleteVolunteerEvent from '@/api/shelter/admin/useDeleteVolunteerEvent';
import { Delete, UploadIcon } from '@/asset/icons';
import ShelterEvent from '@/components/shelter-event/ShelterEvent';
import useDialog from '@/hooks/useDialog';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import { useAuthContext } from '@/providers/AuthContext';
import { palette } from '@/styles/color';
import { usePathname, useRouter } from 'next/navigation';

export default function VolunteerEventPage() {
  const router = useRouter();

  const pathname = usePathname();
  const splittedPath = pathname.split('/');
  const shelterId = Number(splittedPath[2]);
  const volunteerEventId = Number(splittedPath[4]);
  const { dangle_id } = useAuthContext();

  const toastOn = useToast();
  const { dialogOn, dialogOff, setDialogLoading } = useDialog();

  const { mutateAsync: deleteEvent } = useDeleteVolunteerEvent();

  const handleClickDeleteVolEvent = (volunteerEventId: number) => {
    dialogOn({
      message: '해당 이벤트를<br/>정말 삭제하시겠습니까?',
      close: {},
      confirm: {
        text: '삭제',
        onClick: () => {
          setDialogLoading(true);
          deleteEvent({ shelterId, volunteerEventId }).then(() => {
            dialogOff();
            toastOn('이벤트가 삭제되었습니다.');
            router.push(`/shelter/${shelterId}`);
          });
        }
      }
    });
  };

  const ShareButton = () => {
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        <UploadIcon onClick={() => toastOn('공유하기 버튼 클릭됨')} />
        {dangle_id === shelterId && (
          <Delete onClick={() => handleClickDeleteVolEvent(volunteerEventId)} />
        )}
      </div>
    );
  };

  useHeader({
    color: palette.white,
    RightSideComponent: ShareButton
  });

  return (
    <>
      <ShelterEvent shelterId={shelterId} volunteerEventId={volunteerEventId} />
    </>
  );
}
