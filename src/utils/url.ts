export const makeUrlSearchParams = (params: {
  [key: string]: string | number | undefined;
}) => {
  let search: string[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.push(`${key}=${value}`);
  });
  return search.join('&');
};
