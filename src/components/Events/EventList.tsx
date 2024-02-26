import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { eventAtom } from "../../api/getEvents";
import { EventTypes, TEvent } from "../../types/EventType";
import { loggedInAtom } from "../Login";
import { searchFilterAtom } from "../../pages/Events";
import { eventFilterAtom, eventReverseDateAtom } from "./EventListHeader";
import {
  activityToColour,
  activityToLabel,
  permissionToLabel,
} from "../../helpers/eventString";
import EventRow from "./EventRow";
import EventColumn from "./EventColumn";
import BookmarkButton, { bookmarkAtom } from "./BookmarkButton";

const EventList: React.FC = () => {
  const events = useAtom(eventAtom)[0];
  const loggedIn = useAtom(loggedInAtom)[0];
  const reversedDates = useAtom(eventReverseDateAtom)[0];
  const searchFilter = useAtom(searchFilterAtom)[0];
  const eventFilter = useAtom(eventFilterAtom)[0];
  const bookmarkedEvents = useAtom(bookmarkAtom)[0];
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

    // Only show bookmarked events
    if (eventFilter.includes("Bookmarked")) {
      allEvents = allEvents.filter((event) =>
        bookmarkedEvents.some(
          (bookmarkedEvent) => bookmarkedEvent.id === event.id,
        ),
      );
    } else if (eventFilter !== EventTypes) {
      // User chose to not show all events
      allEvents = allEvents.filter((event) =>
        eventFilter.includes(event.event_type),
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
  }, [
    events,
    loggedIn,
    eventFilter,
    reversedDates,
    searchFilter,
    bookmarkedEvents,
  ]);

  return (
    <main className="w-full">
      {sortedEvents.map((event: TEvent) => (
        <div
          key={event.id}
          className={`flex justify-center items-center bg-bv-white my-5 px-3 md:px-6 py-3 rounded-xl
          min-h-[108px] border-${activityToColour[event.event_type]} translucent border-l-[25px]`}
        >
          <div className="flex w-full h-full items-center">
            <div className="flex flex-col w-[95%] md:w-[40%] gap-[1px] md:gap-0">
              <div className="flex flex-col">
                <h1
                  className={`${event.name.length > 30 ? "text-[2.2vw]" : "text-[1.6vh]"} md:text-sm lg-text:md xl:text-lg
                  text-black font-bold w-[80%] md:w-[40%] md:whitespace-nowrap`}
                >
                  {event.name}
                  <BookmarkButton event={event} />
                </h1>
                <p className="text-black list-font-size-sm hidden md:block">
                  {activityToLabel[event?.event_type || ""] ?? "Event"}
                </p>
              </div>
              <EventColumn event={event} />
            </div>

            <EventRow event={event} />

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
