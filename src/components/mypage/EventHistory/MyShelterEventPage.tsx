'use client';
import useMyShelterEvent from '@/api/mypage/event/useMyShelterEvent';
import useMyInfo from '@/api/mypage/useMyInfo';
import { ChipOption } from '@/components/common/ChipInput/ChipInput';
import EventHistory from '@/components/mypage/EventHistory/EventHistory';
import useEventFilter from '@/components/mypage/EventHistory/hooks/useEventFilter';
import useEventScroll from '@/components/mypage/EventHistory/hooks/useEventScroll';
import { isShelterInfo } from '@/components/mypage/MyPageMain/MyPageMain';
import useHeader from '@/hooks/useHeader';
import { palette } from '@/styles/color';

export default function MyShelterEventPage({
  dangle_role
}: {
  dangle_role: string;
}) {
  useHeader({ title: '봉사 활동 조회', color: palette.white });
  const { shelterFilter, handleChipInput } = useEventFilter();

  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyShelterEvent(shelterFilter);

  useEventScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    shelterFilter
  });

  const STATUS_OPTIONS: ChipOption[] = [
    {
      label: `전체 ${
        isShelterInfo(info)
          ? info?.historyStat.done + info?.historyStat.inProgress
          : 0
      }`,
      value: ''
    },
    {
      label: `진행중 ${isShelterInfo(info) ? info?.historyStat.inProgress : 0}`,
      value: 'IN_PROGRESS'
    },
    {
      label: `종료 ${isShelterInfo(info) ? info?.historyStat.done : 0}`,
      value: 'DONE'
    }
  ];

  return (
    <EventHistory
      data={data!}
      isLoading={isLoading}
      isVolunteer={false}
      shelterFilter={shelterFilter}
      options={STATUS_OPTIONS}
      onChange={handleChipInput}
    />
  );
}
