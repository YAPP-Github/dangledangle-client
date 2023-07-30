import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  position: 'relative',
  flex: `0 0 auto`,
  borderRadius: '8px',
  backgroundColor: 'white',
  flexDirection: 'column',
  height: '146px',
  width: '272px',
  padding: '16px 20px',
  boxSizing: 'border-box',
  border: `1px solid ${palette.gray200}`,
  backgroundImage: 'url(/svg/PuppySpotGray.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'auto',
  backgroundPosition: '148px -86px',
  selectors: {
    [`&:only-child`]: {
      flexGrow: 1
    },
    [`&:first-child`]: {
      backgroundImage: 'url(/svg/PuppySpot.svg)',
      backgroundColor: palette.primary300,
      border: 'none'
    }
  }
});

export const timeInfo = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '2px',
  color: `white`,
  selectors: {
    [`${container}:first-child &`]: {
      color: `white`
    }
  }
});

export const bottomInfo = style({
  display: 'flex',
  marginTop: '12px',
  justifyContent: 'space-between',
  selectors: {
    [`${container}:first-child &`]: {
      color: `white`
    }
  }
});
export const firstCardVariation = style({
  selectors: {
    [`${container}:first-child &`]: {
      color: `white`
    }
  }
});

export const title = style({
  marginTop: '20px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  selectors: {
    [`${container}:first-child &`]: {
      color: `white`
    }
  }
});
