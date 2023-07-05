import { VolunteerEvent } from '../global/VolunteerEventCard/VolunteerEventCard';

export const volunteerEventsMock: VolunteerEvent[] = [
  {
    eventStatus: 'DONE',
    category: '산책 봉사',
    volunteerEventId: 11,
    title: '한강 인근 댕댕이 산책 봉사자 모집합니다.',
    recruitNum: 5,
    participantNum: 5,
    waitingNum: 2,
    date: '2023-07-01',
    startTime: '17:00',
    endTime: '19:00',
    myParticipationStatus: 'NONE'
  },
  {
    eventStatus: 'DONE',
    category: '산책 봉사',
    volunteerEventId: 12,
    title: '태평역 인근 산책 봉사자 모집합니다.',
    recruitNum: 5,
    participantNum: 5,
    waitingNum: 5,
    date: '2023-07-01',
    startTime: '17:00',
    endTime: '18:00',
    myParticipationStatus: 'PARTICIPATING'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: '견사 청소',
    volunteerEventId: 13,
    title: '노원역 인근 견사 청소 봉사자 모집합니다.',
    participantNum: 4,
    recruitNum: 5,
    waitingNum: 0,
    date: '2023-07-22',
    startTime: '17:00',
    endTime: '18:30',
    myParticipationStatus: 'WAITING'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: '홍보물 제작',
    volunteerEventId: 14,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    participantNum: 6,
    waitingNum: 3,
    date: '2023-07-22',
    startTime: '17:00',
    endTime: '19:30',
    myParticipationStatus: 'NONE'
  }
];
