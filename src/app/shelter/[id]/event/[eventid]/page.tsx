import VolunteerEventPage from '@/components/shelter-event/VolunteerEventPage/VolunteerEventPage';

export interface EventPageProps {
  params: {
    id: string;
    eventid: string;
  };
}
export default async function EventPage({ params }: EventPageProps) {
  const { id: shelterId, eventid: volunteerEventId } = params;

  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(queryKey.detail(+volunteerEventId), () =>
  //   get(+shelterId, +volunteerEventId)
  // );
  // const dehydratedState = dehydrate(queryClient);

  return (
    // <Hydrate state={dehydratedState}>
    <VolunteerEventPage
      shelterId={+shelterId}
      volunteerEventId={+volunteerEventId}
    />
    // </Hydrate>
  );
}
