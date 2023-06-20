import getQueryClient from '@/providers/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import React from 'react';
import Test from './Test';
import Hydrate from '@/providers/Hydrate';

export const getDatas = async () => {
  const test = await fetch('https://meowfacts.herokuapp.com').then((res: any) =>
    res.json()
  );
  return test;
};

export default async function HydratedDatas() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['test'], getDatas);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Test />
    </Hydrate>
  );
}
