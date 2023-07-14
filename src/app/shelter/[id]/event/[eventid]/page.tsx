'use client';

import { Delete, UploadIcon } from '@/asset/icons';
import ShelterEvent from '@/components/shelter-event/ShelterEvent';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import { palette } from '@/styles/color';

interface VolunteerEventProps {}

const ShareButton = () => {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <UploadIcon onClick={() => toast('공유하기 버튼 클릭됨')} />
      <Delete onClick={() => toast('삭제 버튼 클릭됨')} />
    </div>
  );
};

export default function VolunteerEventPage({}: VolunteerEventProps) {
  const setHeader = useHeader({
    color: palette.white,
    RightSideComponent: ShareButton
  });

  return (
    <>
      <ShelterEvent />
    </>
  );
}
