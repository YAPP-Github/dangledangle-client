'use client';

import Filter from '@/components/common/Filter/Filter';
import HomeCalendar from '@/components/home/HomeCalendar/HomeCalendar';
import {
  CATEGORY_OPTIONS,
  SHELTER_REGION_OPTIONS,
  ShelterRegion,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';
import { EventStatus } from '@/types/volunteerEvent';
import { useCallback, useState } from 'react';
import * as styles from './styles.css';
import ChipInput from '@/components/common/ChipInput/ChipInput';

type EventFilter = {
  region: 'local' | ShelterRegion;
  category: 'all' | VolunteerEventCategory;
  status: 'all' | EventStatus;
};
export default function HomePage() {
  const [filter, setFilter] = useState<EventFilter>({
    region: 'local',
    category: 'all',
    status: 'all'
  });

  const handleChangeFilter = useCallback((name: string, value: string) => {
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  return (
    <div>
      <div className={styles.filterContainer}>
        <Filter
          label="지역"
          name="region"
          options={SHELTER_REGION_OPTIONS}
          onChange={handleChangeFilter}
        />
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
      <HomeCalendar />
    </div>
  );
}
