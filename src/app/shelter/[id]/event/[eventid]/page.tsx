'use client';

import { Delete, UploadIcon } from '@/asset/icons';
import ShelterEvent, {
  VolunteerEventDetail
} from '@/components/shelter/shelter-event/ShelterEvent';
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
      <ShelterEvent eventDetail={mock} />
    </>
  );
}

const mock: VolunteerEventDetail = {
  shelterName: 'YAPP 보호소',
  imageSrc: '/sparkle.png',
  volunteerEventId: 11,
  title: '한강 인근 댕댕이 산책 봉사자 모집합니다.',
  recruitNum: 5,
  address: {
    address: '서울시 판교로 낙생고등학교',
    addressDetail: '판교',
    postalCode: '01301',
    latitude: 33.450701,
    longitude: 126.570667
  },
  description:
    "유기견과 함께 산책 등 \n- 입양 대기중인 유기견과 인근 공원 등 야외 산책\n - 입양 대기중인 유기견의 놀이방 청소 등 관리 보조\n\n* '모집완료'라고 표시되어 있으면, 현재 자원봉사자가 다 차있는 것입니다.\n* '모집중'이라고 표시되어 있으면, 현재 빈자리가 있는 것입니다.\n* 신청 후 별도의 연락이 가지 않습니다. 당일에 서울동물복지지원센터(마포)로 오시면 됩니다.(시청으로 가시면 안됩니다.)",
  ageLimit: '성인만',
  category: 'WALKING',
  eventStatus: 'DONE',
  myParticipationStatus: 'PARTICIPATING',
  startAt: '2023-07-10T04:29:42.639Z',
  endAt: '2023-07-10T04:29:42.639Z',
  joiningVolunteers: ['홍시맘', '댕댕이', '댕글댕글이', '말랭이'],
  waitingVolunteers: ['홍시맘', '댕댕이']
};
