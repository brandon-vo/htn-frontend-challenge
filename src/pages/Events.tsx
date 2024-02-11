import { faFilter } from "@fortawesome/free-solid-svg-icons";
import EventsList from "../components/EventsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EventListHeader from "../components/EventListHeader";

const Events: React.FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-start w-full mt-[70px] p-12 md:px-34 lg:px-32 2xl:px-80">
        <h1 className="font-bold text-[3vh] lg:text-[4vh] my-1">
          Upcoming Events
        </h1>
        <div className="flex flex-col w-full">
          <EventListHeader />
          <EventsList />
        </div>
      </div>
    </div>
  );
};

export default Events;
