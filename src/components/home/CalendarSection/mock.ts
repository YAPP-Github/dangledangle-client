import { HomeVolunteerEvent } from '@/types/volunteerEvent';

export const homeEventsMock: HomeVolunteerEvent[] = [
  {
    shelterId: 8,
    shelterName: '하영보호소',
    shelterProfileImageUrl: null,

    eventStatus: 'DONE',
    category: 'WALKING',
    volunteerEventId: 11,
    title: '한강 인근 댕댕이 산책 봉사자 모집합니다.',
    recruitNum: 5,
    joinNum: 5,
    waitingNum: 2,
    startAt: '2023-08-01T12:30:55.162Z',
    endAt: '2023-08-01T13:30:55.162Z',
    myParticipationStatus: 'NONE'
  },
  {
    shelterId: 8,
    shelterName: '하영보호소',
    shelterProfileImageUrl: null,
    eventStatus: 'DONE',
    category: 'WALKING',
    volunteerEventId: 12,
    title: '태평역 인근 산책 봉사자 모집합니다.',
    recruitNum: 5,
    joinNum: 5,
    waitingNum: 5,
    startAt: '2023-08-01T19:00:55.162Z',
    endAt: '2023-08-01T20:00:55.162Z',
    myParticipationStatus: 'PARTICIPATING'
  },
  {
    shelterId: 8,
    shelterName: '하영보호소',
    shelterProfileImageUrl: null,
    eventStatus: 'IN_PROGRESS',
    category: 'SHELTER_CLEANING',
    volunteerEventId: 13,
    title: '노원역 인근 견사 청소 봉사자 모집합니다.',
    joinNum: 4,
    recruitNum: 5,
    waitingNum: 0,
    startAt: '2023-08-09T12:30:55.162Z',
    endAt: '2023-08-09T14:30:55.162Z',
    myParticipationStatus: 'WAITING'
  },
  {
    shelterId: 8,
    shelterName: '하영보호소',
    shelterProfileImageUrl: null,
    eventStatus: 'IN_PROGRESS',
    category: 'PROMOTION',
    volunteerEventId: 14,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    joinNum: 6,
    waitingNum: 3,
    startAt: '2023-08-09T10:00:55.162Z',
    endAt: '2023-08-09T12:00:55.162Z',
    myParticipationStatus: 'NONE'
  },
  {
    shelterId: 8,
    shelterName: '하영보호소',
    shelterProfileImageUrl: null,
    eventStatus: 'IN_PROGRESS',
    category: 'PROMOTION',
    volunteerEventId: 15,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    joinNum: 6,
    waitingNum: 3,
    startAt: '2023-08-20T12:00:55.162Z',
    endAt: '2023-08-20T13:00:55.162Z',
    myParticipationStatus: 'NONE'
  },
  {
    shelterId: 8,
    shelterName: '하영보호소',
    shelterProfileImageUrl: null,
    eventStatus: 'IN_PROGRESS',
    category: 'PROMOTION',
    volunteerEventId: 16,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    joinNum: 6,
    waitingNum: 3,
    startAt: '2023-08-29T12:00:55.162Z',
    endAt: '2023-08-29T16:00:55.162Z',
    myParticipationStatus: 'NONE'
  }
];