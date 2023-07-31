'use client';

import Filter from '@/components/common/Filter/Filter';
import HomeCalendar from '@/components/home/HomeCalendar/HomeCalendar';
import {
  CATEGORY_OPTIONS,
  EVENT_STATUS_OPTIONS,
  REGION_OPTIONS,
  RegionOptions,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';
import { EventStatus } from '@/types/volunteerEvent';
import { useCallback, useEffect, useState } from 'react';
import * as styles from './CalendarSection.css';
import ChipInput from '@/components/common/ChipInput/ChipInput';
import { Body3, H4 } from '@/components/common/Typography';
import { useAuthContext } from '@/providers/AuthContext';
import getUserGeolocation from './utils/getUserGeolocation';
import useBooleanState from '@/hooks/useBooleanState';

type EventFilter = {
  region: '내 주변' | RegionOptions;
  category: 'all' | VolunteerEventCategory;
  status: EventStatus;
  bookmark: boolean;
};
export default function CalendarSection() {
  const { dangle_role } = useAuthContext();
  const [filter, setFilter] = useState<EventFilter>({
    region: '내 주변',
    category: 'all',
    status: 'IN_PROGRESS',
    bookmark: false
  });
  const [loading, loadingOn, loadingOff] = useBooleanState(true);
  const [geolocation, setGeolocation] = useState<GeolocationPosition>();

  const handleChangeFilter = useCallback(
    (name: string, value: string | boolean) => {
      setFilter(prev => ({
        ...prev,
        [name]: value
      }));
    },
    []
  );

  useEffect(() => {
    if (dangle_role !== 'SHELTER' && filter.region === '내 주변') {
      loadingOn();
      getUserGeolocation()
        .then(setGeolocation)
        .catch(() => {
          // TODO: 필터 값 바꾸기
          setFilter(prev => ({ ...prev, region: REGION_OPTIONS[0] }));
        })
        .finally(loadingOff);
    } else {
      loadingOff();
    }
  }, [dangle_role, filter.region, handleChangeFilter, loadingOff, loadingOn]);

  return (
    <div>
      <div className={styles.title}>
        <H4> 봉사 일정을 둘러봐요 🙌 </H4>
      </div>
      <div className={styles.sticky}>
        <div className={styles.filterContainer}>
          {(dangle_role === 'SHELTER' && (
            <Filter
              label="모집 상태"
              name="status"
              options={EVENT_STATUS_OPTIONS}
              onChange={handleChangeFilter}
            />
          )) || (
            <Filter
              label="지역"
              name="region"
              options={['내 주변', ...REGION_OPTIONS]}
              onChange={handleChangeFilter}
            />
          )}
          <ChipInput
            style={{
              flexWrap: 'nowrap'
            }}
            name="category"
            value={filter.category}
            options={[{ label: '전체', value: 'all' }, ...CATEGORY_OPTIONS]}
            onChange={handleChangeFilter}
          />
        </div>
        <HomeCalendar
          bookmark={filter.bookmark}
          onChangeBookmark={() =>
            handleChangeFilter('bookmark', !filter.bookmark)
          }
        />
        {dangle_role === 'NONE' && filter.bookmark && (
          <div className={styles.empty}>
            <Body3 color="gray400">
              보호소 즐겨찾기 기능을 사용하려면 <br />
              로그인이 필요합니다
            </Body3>
          </div>
        )}
      </div>
      {!loading && (
        <div>
          <div className={styles.dummyItem} />
          <div className={styles.dummyItem} />
          <div className={styles.dummyItem} />
          <div className={styles.dummyItem} />
          <div className={styles.dummyItem} />
          <div className={styles.dummyItem} />
        </div>
      )}
    </div>
  );
}
