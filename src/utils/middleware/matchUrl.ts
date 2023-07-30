export const matchURL = (hasUrlPropertyObjList: { url: string | RegExp }[]) => {
  let cachedURLList: (string | RegExp)[] | null = null;

  return (path: string) => {
    if (!cachedURLList) {
      cachedURLList = hasUrlPropertyObjList.map(item => item.url);
    }
    const result = cachedURLList.findIndex(url => {
      if (typeof url === 'string') {
        return url.toLocaleLowerCase() === path.toLocaleLowerCase();
      } else {
        return url.test(path);
      }
    });
    // findIndex에서 값을 찾지 못하면 result === -1
    return result !== -1 ? result : null;
  };
};
