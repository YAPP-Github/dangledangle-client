export const isEmptyObject = (obj: any) => {
  return (
    obj &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    !(obj instanceof Date) &&
    !Object.keys(obj).length
  );
};
