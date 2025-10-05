import EventDetails from '../event_details';

export default function Page({ params }){
  const { id } = params;
  return <EventDetails id={id} />;
}
