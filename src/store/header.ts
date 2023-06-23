import { atom } from 'recoil';

export interface HeaderState {
  isHeader?: 'hidden' | 'visible';
  isBackArrow?: 'hidden' | 'visible';
  title: string;
  thisPage: number | null;
  entirePage: number | null;
}

export const headerState = atom<HeaderState>({
  key: 'header',
  default: { isHeader: 'visible', isBackArrow: 'visible' } as HeaderState
  // effects: [localStorageEffect('header')]
});
