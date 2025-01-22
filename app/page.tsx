import EventsPage from "./components/EventsPage";

const Page = async () => {
  const data = await fetch(process.env.URL + "/api/events");
  const response = await data.json();
  const initialEvents = response.records;
  const initialResultsNumber = response.total;

  return (
    <EventsPage
      initialEvents={initialEvents}
      initialResultsNumber={initialResultsNumber}
    />
  );
};

export default Page;
