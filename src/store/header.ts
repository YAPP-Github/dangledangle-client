import { atom } from 'recoil';

export interface HeaderState {
  title: string;
  thisPage: number | null;
  entirePage: number | null;
}

export const headerState = atom<HeaderState>({
  key: 'header',
  default: {} as HeaderState
  // effects: [localStorageEffect('header')]
});
