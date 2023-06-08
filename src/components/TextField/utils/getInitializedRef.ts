const getInitializedRef = <T>(ref: { current: T | null }) => {
  if (ref.current === null) throw new Error('ref가 정의되지 않았습니다.');
  return ref.current;
};

export default getInitializedRef;
