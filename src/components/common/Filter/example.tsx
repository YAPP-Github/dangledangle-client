'use client';

import { useCallback, useEffect, useState } from 'react';
import Filter from './Filter';

export default function FilterExample() {
  // state로 관리
  const [searchData, setSearchData] = useState({
    region: option_region[0].value,
    category: ''
  });

  const handleSearchData = useCallback((name: string, value: string) => {
    setSearchData(searchData => ({ ...searchData, [name]: value }));
  }, []);

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <>
      <Filter
        name="region"
        label="지역"
        options={option_region}
        onChange={handleSearchData}
      />
    </>
  );
}

const option_status = [
  { label: '전체', value: 'ALL' },
  { label: '모집중', value: 'IN_PROGRESS' },
  { label: '모집 종료', value: 'DONE' }
];

const option_region = [
  { label: '내 주변', value: 'MY_REGION' },
  { label: '서울', value: 'SEOUL' },
  { label: '경기도', value: 'GYEONGGI' },
  { label: '인천', value: 'INCHEON' },
  { label: '대전', value: 'DAEJEON' },
  { label: '강원도', value: 'GANGWON' },
  { label: '대구', value: 'DAEGU' },
  { label: '경상도', value: 'GYEONGSANG' },
  { label: '충청도', value: 'CHUNGCHEONG' },
  { label: '제주도', value: 'JEJU' }
];
