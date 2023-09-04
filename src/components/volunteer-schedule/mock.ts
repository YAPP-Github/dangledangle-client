import { VolunteerEvent } from '../../types/volunteerEvent';

export const volunteerEventsMock: VolunteerEvent[] = [
  {
    eventStatus: 'DONE',
    category: 'WALKING',
    volunteerEventId: 11,
    title: '한강 인근 댕댕이 산책 봉사자 모집합니다.',
    recruitNum: 5,
    joiningNum: 5,
    waitingNum: 2,
    startAt: '2023-07-01T12:30:55.162Z',
    endAt: '2023-07-01T13:30:55.162Z',
    myParticipationStatus: 'NONE'
  },
  {
    eventStatus: 'DONE',
    category: 'WALKING',
    volunteerEventId: 12,
    title: '태평역 인근 산책 봉사자 모집합니다.',
    recruitNum: 5,
    joiningNum: 5,
    waitingNum: 5,
    startAt: '2023-07-01T19:00:55.162Z',
    endAt: '2023-07-01T20:00:55.162Z',
    myParticipationStatus: 'JOINING'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: 'SHELTER_CLEANING',
    volunteerEventId: 13,
    title: '노원역 인근 견사 청소 봉사자 모집합니다.',
    joiningNum: 4,
    recruitNum: 5,
    waitingNum: 0,
    startAt: '2023-07-09T12:30:55.162Z',
    endAt: '2023-07-09T14:30:55.162Z',
    myParticipationStatus: 'WAITING'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: 'PROMOTION',
    volunteerEventId: 14,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    joiningNum: 6,
    waitingNum: 3,
    startAt: '2023-07-09T10:00:55.162Z',
    endAt: '2023-07-09T12:00:55.162Z',
    myParticipationStatus: 'NONE'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: 'PROMOTION',
    volunteerEventId: 15,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    joiningNum: 6,
    waitingNum: 3,
    startAt: '2023-07-20T12:00:55.162Z',
    endAt: '2023-07-20T13:00:55.162Z',
    myParticipationStatus: 'NONE'
  },
  {
    eventStatus: 'IN_PROGRESS',
    category: 'PROMOTION',
    volunteerEventId: 16,
    title: '홍보물 제작 봉사자 모집합니다.',
    recruitNum: 6,
    joiningNum: 6,
    waitingNum: 3,
    startAt: '2023-07-29T12:00:55.162Z',
    endAt: '2023-07-29T16:00:55.162Z',
    myParticipationStatus: 'NONE'
  }
];
