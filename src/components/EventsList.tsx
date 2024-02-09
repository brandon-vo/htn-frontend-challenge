import { useAtom } from "jotai";
import { apiDataAtom } from "../getApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TEvent } from "../types";
import { Link } from "react-router-dom";
import React from "react";
import { loggedInAtom } from "./Login";

const activityToColour: { [key: string]: string } = {
  workshop: "bv-blue",
  activity: "bv-orange",
  tech_talk: "bv-purple",
};

const EventsList: React.FC = () => {
  const apiData = useAtom(apiDataAtom)[0];
  const loggedIn = useAtom(loggedInAtom)[0];
  const [sortedEvents, setSortedEvents] = useState<TEvent[]>(apiData);

  useEffect(() => {
    let filteredEvents: TEvent[] = [];

    if (loggedIn) {
      filteredEvents = [...apiData];
    } else {
      filteredEvents = apiData.filter(
        (event) => event.permission !== "private",
      );
    }

    const sorted = filteredEvents.sort((a, b) => a.start_time - b.start_time);
    setSortedEvents(sorted);
    console.log(sorted);
  }, [apiData, loggedIn]);

  return (
    <div className="w-full">
      {sortedEvents.map((event: any) => (
        <div
          key={event.id}
          className={`bg-bv-white my-5 px-6 py-6 rounded-xl border-${activityToColour[event.event_type]} border-l-[25px]`}
        >
          <div className="flex w-full h-full items-center">
            <div className="flex flex-col w-[85%] md:w-[40%] gap-1 md:gap-0">
              <h1 className="text-sm lg-text:md xl:text-lg text-black font-bold w-[80%] md:w-[40%] md:whitespace-nowrap">
                {event.name}
              </h1>
              <p className="block md:hidden text-xs text-gray-500">
                {format(new Date(event.start_time), "MMM dd, yyyy • h:mm a")} -{" "}
                {format(new Date(event.end_time), "h:mm a")}
              </p>
            </div>
            <div className="justify-end w-[15%] hidden md:flex">
              {event.speakers.map((speaker: TEvent) => (
                <p
                  key={speaker.name}
                  className="list-font-size text-black whitespace-nowrap"
                >
                  {speaker.name}
                </p>
              ))}
            </div>

            <div className="justify-center w-[15%] hidden md:flex">
              <p className="list-font-size text-black">
                {event.permission === "private" ? "Hackers" : "Everyone"}
              </p>
            </div>
            <div className="flex-col w-[15%] hidden md:flex">
              <p className="text-black list-font-size">
                {format(new Date(event.start_time), "MMM dd, yyyy")}
              </p>
              <p className="!text-xs text-gray-500 list-font-size">
                {format(new Date(event.start_time), "h:mm a")} -{" "}
                {format(new Date(event.end_time), "h:mm a")}
              </p>
            </div>
            <div className="flex ml-auto justify-end w-[15%]">
              <Link
                to={`/events/${event.id}`}
                className="bg-medium-pink hover:bg-dark-pink transition 
                  py-2 px-4 text-center text-shadow rounded-full w-[125px] hidden xl:block"
              >
                View Details
              </Link>
              <Link
                to={`/events/${event.id}`}
                className="bg-medium-pink hover:bg-dark-pink transition 
                  py-2 px-4 text-center text-shadow rounded-xl w-[100px] block xl:hidden"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
