'use client';

import Filter, { FilterRef } from '@/components/common/Filter/Filter';
import HomeCalendar, {
  CALENDAR_ID
} from '@/components/home/HomeCalendar/HomeCalendar';
import {
  CATEGORY_OPTIONS,
  EVENT_STATUS_FILTER_OPTIONS,
  REGION_OPTIONS
} from '@/constants/volunteerEvent';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './CalendarSection.css';
import ChipInput from '@/components/common/ChipInput/ChipInput';
import { Body3, H3 } from '@/components/common/Typography';
import { useAuthContext } from '@/providers/AuthContext';
import getUserGeolocation from './utils/getUserGeolocation';
import useBooleanState from '@/hooks/useBooleanState';
import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import useHomeEventList, {
  monthlyInfiniteOption
} from '@/api/volunteer-event/useHomeEventList';
import { HomeEventFilter } from '@/api/volunteer-event';
import { getEndOfMonth, getStartOfMonth } from '@/utils/timeConvert';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';
import { homeEventsMock } from './mock';

export default function CalendarSection() {
  const { dangle_role } = useAuthContext();
  const [filterInput, setFilterInput] = useState<HomeEventFilter>({
    address: '내 주변',
    category: 'all',
    status: dangle_role === 'SHELTER' ? 'IN_PROGRESS' : 'all',
    isFavorite: false
  });
  const [loading, loadingOn, loadingOff] = useBooleanState(true);
  const [geolocation, setGeolocation] = useState<GeolocationPosition>();
  const regionFilterRef = useRef<FilterRef>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isFolded, setIsFolded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const filterForQuery = useMemo<HomeEventFilter>(() => {
    if (
      dangle_role !== 'SHELTER' &&
      filterInput.address === '내 주변' &&
      geolocation
    ) {
      return {
        ...filterInput,
        longitude: geolocation.coords.longitude,
        latitude: geolocation.coords.latitude
      };
    }
    return { ...filterInput, address: undefined };
  }, [dangle_role, filterInput, geolocation]);

  const query = useHomeEventList(
    filterForQuery,
    getStartOfMonth(new Date()),
    getEndOfMonth(new Date()),
    { ...monthlyInfiniteOption, enabled: !loading }
  );

  const volunteerEvents = useMemo(() => {
    // TODO: mock data 제거
    if (!query.data) {
      return homeEventsMock;
    }
    const pages = query.data?.pages;
    return pages?.flatMap(page => page.events);
  }, [query.data]);

  const handleChangeFilter = useCallback(
    (name: string, value: string | boolean) => {
      setFilterInput(prev => ({
        ...prev,
        [name]: value
      }));
    },
    []
  );

  useEffect(() => {
    if (dangle_role !== 'SHELTER' && filterInput.address === '내 주변') {
      loadingOn();
      getUserGeolocation()
        .then(setGeolocation)
        .catch(() => {
          regionFilterRef.current?.setPickOption(REGION_OPTIONS[0]);
          setFilterInput(prev => ({ ...prev, address: REGION_OPTIONS[0] }));
        })
        .finally(loadingOff);
    } else {
      loadingOff();
    }
  }, [
    dangle_role,
    filterInput.address,
    handleChangeFilter,
    loadingOff,
    loadingOn
  ]);

  useEffect(() => {
    function autoFoldCalendar() {
      if (!stickyRef.current) return;
      const stickyTop = stickyRef.current.getBoundingClientRect().top;
      if (stickyTop <= HEADER_HEIGHT) {
        setIsFolded(true);
        window.removeEventListener('scroll', autoFoldCalendar);
      }
    }

    window.addEventListener('scroll', autoFoldCalendar);
    return () => {
      window.removeEventListener('scroll', autoFoldCalendar);
    };
  }, []);

  const scrollToTarget = (eventCardEl: HTMLElement) => {
    const calendarEl = document.getElementById(CALENDAR_ID);
    if (!calendarEl) return;

    const calendarBottom = calendarEl.getBoundingClientRect().bottom;
    const eventCardTop = eventCardEl.getBoundingClientRect().top;
    const scrollTo = window.scrollY + eventCardTop - calendarBottom;

    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  };

  const fetchNextEvents = useCallback(async () => {
    const result = await query.fetchNextPage();
    return { hasNext: Boolean(result.hasNextPage) };
  }, [query]);

  return (
    <div>
      <div className={styles.title}>
        <H3> 봉사 일정을 둘러봐요 🙌 </H3>
      </div>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.filterContainer}>
          {(dangle_role === 'SHELTER' && (
            <Filter
              label="모집 상태"
              name="status"
              options={EVENT_STATUS_FILTER_OPTIONS}
              onChange={handleChangeFilter}
            />
          )) || (
            <Filter
              ref={regionFilterRef}
              label="지역"
              name="address"
              options={['내 주변', ...REGION_OPTIONS]}
              onChange={handleChangeFilter}
            />
          )}
          <ChipInput
            style={{
              flexWrap: 'nowrap'
            }}
            name="category"
            value={filterInput.category || 'all'}
            options={[{ label: '전체', value: 'all' }, ...CATEGORY_OPTIONS]}
            onChange={handleChangeFilter}
          />
        </div>
        <HomeCalendar
          isFolded={isFolded}
          setIsFolded={setIsFolded}
          date={selectedDate}
          onClickDate={setSelectedDate}
          bookmark={filterInput.isFavorite || false}
          onChangeBookmark={() =>
            handleChangeFilter('isFavorite', !filterInput.isFavorite)
          }
        />
        {dangle_role === 'NONE' && filterInput.isFavorite && (
          <div className={styles.empty}>
            <Body3 color="gray400">
              보호소 즐겨찾기 기능을 사용하려면 <br />
              로그인이 필요합니다
            </Body3>
          </div>
        )}
      </div>
      <div style={{ marginTop: '16px' }}>
        {!volunteerEvents && <SkeletonList />}
        {volunteerEvents && (
          <VolunteerEventList
            selectedDate={selectedDate}
            events={volunteerEvents}
            scrollTo={scrollToTarget}
            fetchNextEvents={fetchNextEvents}
          />
        )}
      </div>
    </div>
  );
}
