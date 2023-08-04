export const palette = {
  white: 'white',
  gray50: '#F8F8F8',
  gray100: '#F3F3F3',
  gray200: '#E8E8E8',
  gray300: '#D5D5D5',
  gray400: '#B1B1B1',
  gray500: '#909090',
  gray600: '#6C6C6C',
  gray700: '#464646',
  gray800: '#333333',
  gray900: '#222222',
  primary50: '#FFF2F2',
  primary100: '#F9D7D7',
  primary200: '#C22D2D',
  primary300: '#FE5555',
  primary400: '#EA3E3E',
  error: '#FF2121',
  background: '#F2F1ED'
} as const;

export type Color = keyof typeof palette;
