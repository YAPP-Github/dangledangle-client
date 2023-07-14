'use client';

import { Delete, UploadIcon } from '@/asset/icons';
import ShelterEvent from '@/components/shelter-event/ShelterEvent';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import { useAuthContext } from '@/providers/AuthContext';
import { palette } from '@/styles/color';
import { usePathname } from 'next/navigation';

interface VolunteerEventProps {}

export default function VolunteerEventPage({}: VolunteerEventProps) {
  const pathname = usePathname();
  const splittedPath = pathname.split('/');
  const shelterId = Number(splittedPath[2]);
  const { dangle_id } = useAuthContext();

  const ShareButton = () => {
    const toast = useToast();
    return (
      <div style={{ display: 'flex', gap: 12 }}>
        <UploadIcon onClick={() => toast('공유하기 버튼 클릭됨')} />
        {dangle_id === shelterId && (
          <Delete onClick={() => toast('삭제 버튼 클릭됨')} />
        )}
      </div>
    );
  };

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
