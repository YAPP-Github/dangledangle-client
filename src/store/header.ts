import { atom } from 'recoil';

export interface HeaderState {
  title: string;
  isHeader?: 'hidden' | 'visible';
  isBackArrow?: 'hidden' | 'visible';
  thisPage?: number | null;
  entirePage?: number | null;
  RightSideButton?: (() => JSX.Element) | null;
}

export const headerState = atom<HeaderState>({
  key: 'header',
  default: { isHeader: 'visible', isBackArrow: 'visible' } as HeaderState
  // effects: [localStorageEffect('header')]
});
