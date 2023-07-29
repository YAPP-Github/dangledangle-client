'use client';

import Filter from '@/components/common/Filter/Filter';
import HomeCalendar from '@/components/home/HomeCalendar/HomeCalendar';
import {
  CATEGORY_OPTIONS,
  EVENT_STATUS_OPTIONS,
  SHELTER_REGION_OPTIONS,
  ShelterRegion,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';
import { EventStatus } from '@/types/volunteerEvent';
import { useCallback, useState } from 'react';
import * as styles from './CalendarSection.css';
import ChipInput from '@/components/common/ChipInput/ChipInput';
import { Body3, H4 } from '@/components/common/Typography';
import { useAuthContext } from '@/providers/AuthContext';

type EventFilter = {
  region: 'local' | ShelterRegion;
  category: 'all' | VolunteerEventCategory;
  status: 'all' | EventStatus;
  bookmark: boolean;
};
export default function CalendarSection() {
  const { dangle_role } = useAuthContext();
  const [filter, setFilter] = useState<EventFilter>({
    region: 'local',
    category: 'all',
    status: 'all',
    bookmark: false
  });

  const handleChangeFilter = useCallback(
    (name: string, value: string | boolean) => {
      setFilter(prev => ({
        ...prev,
        [name]: value
      }));
    },
    []
  );
  return (
    <div>
      <div className={styles.title}>
        <H4> 봉사 일정을 둘러봐요 🙌 </H4>
      </div>
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
            options={SHELTER_REGION_OPTIONS}
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
  );
}
