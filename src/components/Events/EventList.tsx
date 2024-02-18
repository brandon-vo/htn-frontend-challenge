import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { eventAtom } from "../../api/getEvents";
import { EventTypes, TEvent } from "../../types/EventType";
import { loggedInAtom } from "../Modals/Login";
import { searchFilterAtom } from "../../pages/Events";
import { eventTypeFilterAtom, eventReverseDateAtom } from "./EventListHeader";
import {
  activityToColour,
  activityToLabel,
  permissionToLabel,
} from "../../helpers/eventString";

const EventList: React.FC = () => {
  const events = useAtom(eventAtom)[0];
  const loggedIn = useAtom(loggedInAtom)[0];
  const reversedDates = useAtom(eventReverseDateAtom)[0];
  const searchFilter = useAtom(searchFilterAtom)[0];
  const eventTypeFilter = useAtom(eventTypeFilterAtom)[0];
  const [sortedEvents, setSortedEvents] = useState<TEvent[]>(events);

  useEffect(() => {
    // All events sorted by date
    let allEvents: TEvent[] = [...events].sort(
      (a, b) => a.start_time - b.start_time,
    );

    // Only public events are shown to non-logged in users
    if (!loggedIn) {
      allEvents = allEvents.filter((event) => event.permission !== "private");
    }

    // User chose to not show all event types
    if (eventTypeFilter !== EventTypes) {
      allEvents = allEvents.filter((event) =>
        eventTypeFilter.includes(event.event_type),
      );
    }

    // Oldest events first
    if (reversedDates) {
      allEvents.reverse();
    }

    // Can search for event name, activity type, invite type, description, and speaker name
    if (searchFilter) {
      allEvents = allEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          activityToLabel[event.event_type].includes(
            searchFilter.toLowerCase(),
          ) ||
          permissionToLabel[event?.permission || ""]
            ?.toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
          event?.description
            ?.toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
          event.speakers.some((speaker) =>
            speaker.name.toLowerCase().includes(searchFilter.toLowerCase()),
          ),
      );
    }
    setSortedEvents(allEvents);
    // console.log(sortedByDates);
  }, [events, loggedIn, eventTypeFilter, reversedDates, searchFilter]);

  return (
    <main className="w-full">
      {sortedEvents.map((event: any) => (
        <div
          key={event.id}
          className={`flex justify-center items-center bg-bv-white my-5 px-3 md:px-6 py-3 rounded-xl min-h-[108px] border-${activityToColour[event.event_type]} translucent border-l-[25px]`}
        >
          <div className="flex w-full h-full items-center">
            <div className="flex flex-col w-[85%] md:w-[40%] gap-1 md:gap-0">
              <div className="flex flex-col">
                <h1
                  className={`${event.name.length > 32 ? "text-[1.1vh]" : "text-[1.6vh]"} md:text-sm lg-text:md xl:text-lg text-black font-bold w-[80%] md:w-[40%] md:whitespace-nowrap`}
                >
                  {event.name}
                </h1>
                <p className="text-black list-font-size-sm hidden md:block">
                  {activityToLabel[event?.event_type || ""] ?? "Event"}
                </p>
              </div>
              <p className="block md:hidden list-font-size-sm text-gray-500">
                {format(new Date(event.start_time), "MMM dd, yyyy • h:mm a")} -{" "}
                {format(new Date(event.end_time), "h:mm a")}
              </p>
              <p className="block md:hidden text-[1.2vh] text-gray-500">
                {activityToLabel[event?.event_type || ""] ?? "Event"}
                {event.speakers.length > 0 &&
                  ` by ${event.speakers.map((speaker: TEvent) => speaker.name).join(", ")}`}
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
                <span
                  className={`${event.permission === "private" && "text-bv-medium-green"}`}
                >
                  {permissionToLabel[event.permission]}
                </span>
              </p>
            </div>
            <div className="flex-col w-[15%] hidden md:flex">
              <p className="text-black list-font-size">
                {format(new Date(event.start_time), "MMM dd, yyyy")}
              </p>
              <p className="text-gray-500 list-font-size-sm">
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
                  py-2 px-[2vw] text-center text-shadow rounded-full w-[100px] block xl:hidden text-sm md:text-md"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default EventList;
