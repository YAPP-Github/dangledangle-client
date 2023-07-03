import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const calendar = style({
  width: '100%',
  maxWidth: '100%',
  margin: 'auto',
  backgroundColor: palette.white,
  color: palette.gray900,
  padding: '20px',
  transform: `translateX(${-GLOBAL_PADDING_X}px)`
});

export const dotWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute'
});

export const dot = recipe({
  base: {
    height: '4px',
    width: '4px',
    borderRadius: '4px',
    display: 'flex',
    marginTop: '20px'
  },
  variants: {
    date: {
      today: {
        backgroundColor: palette.white
      },
      other: {
        backgroundColor: palette.gray600
      }
    }
  }
});

globalStyle(`${calendar} *`, {
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box'
});

globalStyle(`${calendar} &::after`, {
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box'
});

globalStyle(`${calendar} &::before`, {
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  boxSizing: 'border-box'
});

globalStyle(`${calendar} button`, {
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  padding: '4px 6px 4px 6px',
  textAlign: 'center'
});

globalStyle(`${calendar} button:enabled:hover`, {
  cursor: 'pointer'
});

// 캘린더 인디케이터
globalStyle(`${calendar} .react-calendar__navigation`, {
  display: 'flex',
  alignItems: 'center',
  height: '44px',
  padding: '0px 80px 0px 80px'
});

globalStyle(`${calendar} .react-calendar__navigation button`, {
  fontSize: '14px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 700
});

// 요일 column
globalStyle(`${calendar} .react-calendar__month-view__weekdays`, {
  padding: '12px 12px 4px 12px',
  fontSize: '12px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '14px',
  color: '#6c6c6c',
  textAlign: 'center'
});

// 날짜 container
globalStyle(`${calendar} .react-calendar__month-view__days`, {
  padding: '0px 12px 0px 12px'
});

globalStyle(`${calendar} .react-calendar__tile`, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '12px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '14px',
  color: '#6c6c6c'
});

// 날짜 호버됐을 시
globalStyle(`${calendar} .react-calendar__tile:enabled:hover`, {
  background: palette.gray100,
  color: palette.primary300,
  borderRadius: '6px'
});

globalStyle(`${calendar} .react-calendar__month-view__days__day--weekend`, {
  color: palette.error
});

globalStyle(
  `${calendar} .react-calendar__month-view__days__day--neighboringMonth`,
  {
    color: palette.gray200
  }
);

// 오늘 날짜
globalStyle(`${calendar} .react-calendar__tile--now `, {
  background: palette.gray900,
  color: palette.white
});

// 선택한 날짜
globalStyle(`${calendar} .react-calendar__tile--active:enabled:focus`, {
  background: palette.gray200,
  color: palette.gray900
});
