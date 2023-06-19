import { atom } from 'recoil';

export interface HeaderState {
  title: string;
  thisPage: number;
  entirePage: number;
}

export const headerState = atom<HeaderState>({
  key: 'header',
  default: {} as HeaderState
  // effects: [localStorageEffect('header')]
});
