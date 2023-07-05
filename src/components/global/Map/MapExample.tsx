import { BaseIcon } from '@/asset/icons';
import { H4 } from '@/components/common/Typography';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const Map = dynamic(() => import('./Map'), { ssr: false });

export default function MapExample() {
  return (
    <>
      <div style={{ display: 'flex', columnGap: 10 }}>
        <BaseIcon />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <H4>주소</H4>
          <Suspense fallback={<div>loading</div>}>
            <Map latitude={33.450701} longitude={126.570667} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
