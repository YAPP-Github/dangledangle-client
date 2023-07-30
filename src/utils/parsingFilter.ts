export const parsingFilter = <T extends Record<string, any>>(
  filter: T
): string => {
  const filterArray = Object.entries(filter);
  let queryParameters = '';
  filterArray
    .filter((item: string[]) => {
      return item[1] !== undefined && item[1] !== '';
    })
    .forEach((item: string[], index: number) => {
      queryParameters += index === 0 ? '?' : '&';
      queryParameters += `${item[0]}=${encodeURIComponent(item[1])}`;
    });

  return queryParameters;
};
