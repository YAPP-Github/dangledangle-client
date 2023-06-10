export const getStringOfValueLengthPerMax = (value: string, max?: number) => {
  if (!max) return '';
  return `${value.length}/${max}`;
};
