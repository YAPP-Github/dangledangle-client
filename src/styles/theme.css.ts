import { globalFontFace, globalStyle } from '@vanilla-extract/css';

/* Global font */
const pretendard = 'Pretendard Variable';
globalFontFace(pretendard, {
  src: `url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css')`
});

globalStyle('html, body', {
  fontFamily: `${pretendard} -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;`,
  fontStyle: 'normal'
});
