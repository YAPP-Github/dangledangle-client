export interface ObservationAnimal {
  id: number;
  images: string[];
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  breed: string;
  specialNote: string;
}

export const mock: ObservationAnimal[] = [
  {
    id: 0,
    images: [''],
    name: '인절미',
    breed: '비글',
    age: 3,
    gender: 'FEMALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  },
  {
    id: 1,
    images: [''],
    name: '홍시',
    breed: '비글',
    age: 3,
    gender: 'MALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  }
];

export const get = async () => {
  return await new Promise<ObservationAnimal[]>(resolve => {
    setTimeout(() => resolve(mock), 100);
  });
};
