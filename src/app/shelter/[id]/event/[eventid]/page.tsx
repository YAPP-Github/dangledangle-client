import VolunteerEventPage from '@/components/shelter-event/VolunteerEventPage/VolunteerEventPage';

export interface EventPageProps {
  params: {
    id: string;
    eventid: string;
  };
}
export default async function EventPage({ params }: EventPageProps) {
  const { id: shelterId, eventid: volunteerEventId } = params;

  return (
    <VolunteerEventPage
      shelterId={+shelterId}
      volunteerEventId={+volunteerEventId}
    />
  );
}
