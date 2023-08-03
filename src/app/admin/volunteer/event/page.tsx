'use client';
import useMyVolEvent from '@/api/mypage/event/useMyVolEvent';
import useMyInfo from '@/api/mypage/useMyInfo';
import { ChipOption } from '@/components/common/ChipInput/ChipInput';
import EventHistory from '@/components/mypage/EventHistory/EventHistory';
import useEventFilter from '@/components/mypage/EventHistory/hooks/useEventFilter';
import useEventScroll from '@/components/mypage/EventHistory/hooks/useEventScroll';
import { isShelterInfo } from '@/components/mypage/MyPageMain/MyPageMain';
import useHeader from '@/hooks/useHeader';
import { useAuthContext } from '@/providers/AuthContext';
import { palette } from '@/styles/color';

export default function MyVolEventPage() {
  useHeader({ title: '봉사 활동 조회', color: palette.white });
  const { dangle_role } = useAuthContext();
  const { shelterFilter, handleChipInput } = useEventFilter();

  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyVolEvent(shelterFilter);

  useEventScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    shelterFilter
  });

  const STATUS_OPTIONS: ChipOption[] = [
    {
      label: `전체 ${
        !isShelterInfo(info)
          ? (info?.historyStat.joining ?? 0) +
            (info?.historyStat.waiting ?? 0) +
            (info?.historyStat.done ?? 0)
          : 0
      }`,
      value: ''
    },
    {
      label: `신청 ${
        !isShelterInfo(info) ? info?.historyStat.joining ?? 0 : 0
      }`,
      value: 'JOINING'
    },
    {
      label: `대기 ${
        !isShelterInfo(info) ? info?.historyStat.waiting ?? 0 : 0
      }`,
      value: 'WAITING'
    },
    {
      label: `이력 ${!isShelterInfo(info) ? info?.historyStat.done ?? 0 : 0}`,
      value: 'DONE'
    }
  ];

  return (
    <EventHistory
      data={data!}
      isLoading={isLoading}
      isVolunteer={true}
      shelterFilter={shelterFilter}
      options={STATUS_OPTIONS}
      onChange={handleChipInput}
    />
  );
}
