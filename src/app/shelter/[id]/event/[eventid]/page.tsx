import Hydrate from '@/providers/Hydrate';
import VolunteerEventPage from '../../../../../components/shelter-event/VolunteerEventPage/VolunteerEventPage';
import getQueryClient from '@/providers/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import { queryKey } from '@/api/shelter/admin/volunteer-event';
import { get } from '@/api/shelter/event/volunteer-event';
export interface EventPageProps {
  params: {
    id: string;
    eventid: string;
  };
}
export default async function EventPage({ params }: EventPageProps) {
  const { id: shelterId, eventid: volunteerEventId } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey.detail(+volunteerEventId), () =>
    get(+shelterId, +volunteerEventId)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <VolunteerEventPage
        shelterId={+shelterId}
        volunteerEventId={+volunteerEventId}
      />
    </Hydrate>
  );
}
