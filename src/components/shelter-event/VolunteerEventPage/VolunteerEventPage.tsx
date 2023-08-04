'use client';

import useDeleteVolunteerEvent from '@/api/shelter/admin/useDeleteVolunteerEvent';
import useVolunteerEvent from '@/api/shelter/event/useVolunteerEvent';
import { Delete, UploadIcon } from '@/asset/icons';
import useDialog from '@/hooks/useDialog';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import { useAuthContext } from '@/providers/AuthContext';
import { palette } from '@/styles/color';
import { useRouter } from 'next/navigation';
import ShelterEvent from '../ShelterEvent/ShelterEvent';
import useSnsShare from '@/hooks/useSnsShare';

interface VolunteerEventPageProps {
  shelterId: number;
  volunteerEventId: number;
}
export default function VolunteerEventPage({
  shelterId,
  volunteerEventId
}: VolunteerEventPageProps) {
  const router = useRouter();
  const { dangle_id } = useAuthContext();

  const toastOn = useToast();
  const { dialogOn, dialogOff, setDialogLoading } = useDialog();
  const { handleSnsShare } = useSnsShare();

  const { mutateAsync: deleteEvent } = useDeleteVolunteerEvent();
  const { data: eventDetail } = useVolunteerEvent(shelterId, volunteerEventId);

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
        <UploadIcon
          onClick={() =>
            handleSnsShare(
              `${eventDetail?.title!}ㆍ${eventDetail?.shelterName}`,
              location.href
            )
          }
        />
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
      <ShelterEvent
        shelterId={shelterId}
        volunteerEventId={volunteerEventId}
        data={eventDetail!}
      />
    </>
  );
}
