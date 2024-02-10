import EventsList from "../components/EventsList";

const Events: React.FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-start w-full mt-[70px] p-12 md:px-34 lg:px-32 2xl:px-80">
        <h1 className="font-bold text-[4vh] my-1">Upcoming Events</h1>
        <div className="flex flex-col w-full">
          <div
            id="category-labels"
            className="hidden md:flex w-full space-between px-[48px] mb-[-15px]"
          >
            <p className="w-[40%] text-[1.5vh] text-bv-grey">Event</p>
            <p className="w-[15%] ml-[15px] text-end text-[1.5vh] text-bv-grey">
              Speakers
            </p>
            <p className="w-[15%] text-center text-[1.5vh] text-bv-grey">
              Invite
            </p>
            <p className="w-[15%] ml-[25px] text-[1.5vh] text-bv-grey">Date</p>
          </div>
          <EventsList />
        </div>
      </div>
    </div>
  );
};

export default Events;
