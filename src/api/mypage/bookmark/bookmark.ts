import api from '@/api/instance';

export const queryKey = {
  all: ['mypage-bookmark'] as const
};

export interface Bookmark {
  shelters: ShelterInfo[];
}

export interface ShelterInfo {
  shelterId: number;
  shelterName: string;
  shelterProfileImageUrl: string;
}

export const getMyBookmark = async () => {
  const response = await api
    .get(`volunteer/my/bookmarks`)
    .then(res => res.json<Bookmark>());
  return response;
};
