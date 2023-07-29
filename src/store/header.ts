import { palette } from '@/styles/color';
import { atom } from 'recoil';

export interface HeaderState {
  color?: string;
  title: string;
  isHeader?: 'hidden' | 'visible';
  isBackArrow?: 'hidden' | 'visible';
  thisPage?: number | null;
  entirePage?: number | null;
  RightSideComponent?: (() => JSX.Element) | null;
}

export const headerState = atom<HeaderState>({
  key: 'header',
  default: {
    color: '',
    title: '',
    isHeader: 'visible',
    isBackArrow: 'visible',
    thisPage: null,
    entirePage: null,
    RightSideComponent: null
  } as HeaderState
  // effects: [localStorageEffect('header')]
});
