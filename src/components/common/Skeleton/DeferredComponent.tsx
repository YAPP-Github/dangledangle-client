import { PropsWithChildren, useEffect, useState } from 'react';

/**
 * Skeleton이 render 되는 시간을 조정할 수 있는
 * DeferredComponent 입니다.
 *
 * @param {PropsWithChildren<{ deferTime: number }>} deferTime 지연 시간을 지정할 수 있습니다. (초기 값 200)
 */
const DeferredComponent = ({
  deferTime,
  children
}: PropsWithChildren<{ deferTime?: number }>) => {
  const [isDeferred, setIsDeferred] = useState(false);
  const DEFERRED_MILLISEC = deferTime || 200;

  useEffect(() => {
    // DEFERRED_MILLISEC 지난 후 skeleton Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, DEFERRED_MILLISEC);
    return () => clearTimeout(timeoutId);
  }, [DEFERRED_MILLISEC]);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};

export default DeferredComponent;
