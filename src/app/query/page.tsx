import React from 'react';
import HydratedDatas from './HydratedDatas';

export default function page() {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <HydratedDatas />
    </div>
  );
}
