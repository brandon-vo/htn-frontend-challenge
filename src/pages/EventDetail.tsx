import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { format } from "date-fns";
import { loggedInAtom } from "../components/Login";
import { eventAtom } from "../api/getEvents";
import {
  activityToColour,
  activityToLabel,
  permissionToLabel,
} from "../helpers/eventString";
import { getYoutubeVideoId } from "../helpers/youtubeVideo";
import BookmarkButton from "../components/Events/BookmarkButton";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedIn = useAtom(loggedInAtom)[0];
  const events = useAtom(eventAtom)[0];
  const event = events[Number(id) - 1];

  useEffect(() => {
    // If the user logs out while on a private event page, redirect them to the events page
    if (!loggedIn && event?.permission === "private") {
      alert("You must be logged in to view this event");
      navigate("../events");
    }
  }, [loggedIn, event?.permission, navigate]);

  const youtubeVideoId = event?.public_url?.includes("youtu.be")
    ? getYoutubeVideoId(event?.public_url)
    : null;

  const numIllustrations = 3;
  const randomIllustrationIdx =
    Math.floor(Math.random() * numIllustrations) + 1;

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-start w-full mt-[75px] py-12 px-8 lg:px-34 lg:px-32 2xl:px-80">
        <header className="flex items-center">
          <Link to="../events/" className="z-[20000]">
            <h1 className="font-bold text-[2.3vh] md:text-[3vh] lg:text-[4vh] text-gray-500">
              Upcoming Events
            </h1>
          </Link>
          <h1 className="font-bold text-[2.3vh] md:text-[3vh] lg:text-[4vh] text-bv-white mx-2">
            {"›"}
          </h1>
          <h1 className="font-bold text-[2.3vh] md:text-[3vh] lg:text-[4vh] text-bv-white ">
            {activityToLabel[event?.event_type || ""] ?? "Event"}
          </h1>
        </header>
        <main className="flex flex-col lg:flex-row w-full h-full mb-12 lg:gap-4">
          <div
            className={`flex flex-col flex-[75%] relative bg-bv-white w-full h-full my-2 p-6 rounded-xl 
                      border-${activityToColour[event?.event_type || ""]} border-l-[1.6vw]`}
          >
            <div className="z-[2]">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <h1 className="text-black text-[2vh] lg:text-[2.3vh] font-semibold">
                    {event?.name}
                    <BookmarkButton event={event} />
                  </h1>
                  {event?.start_time && (
                    <p className="text-[1.2vh] lg:text-[1.5vh] text-gray-500">
                      {format(
                        new Date(event?.start_time as number),
                        "MMM dd, yyyy • h:mm a",
                      )}{" "}
                      - {format(new Date(event?.end_time), "h:mm a")}
                    </p>
                  )}
                  {event?.speakers.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      <p className="text-gray-600 text-[2vh]">Presented by</p>
                      {event?.speakers.map((speaker: any) => (
                        <p
                          key={speaker.name}
                          className="text-gray-600 text-[2vh]"
                        >
                          {speaker.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {loggedIn && (
                  <a
                    className="ml-auto mb-auto text-bv-white text-shadow rounded-full bg-medium-pink 
                            hover:bg-dark-pink transition py-2 px-[4vw] md:px-12"
                    target="_blank"
                    rel="noreferrer"
                    href={event?.private_url}
                  >
                    Link
                  </a>
                )}
              </div>
              <p className="text-black text-[1.7vh] mt-1 mb-2">
                {event?.description}
              </p>
              <p className="text-[1.8vh] text-gray-500 italic">
                Event for {permissionToLabel[event?.permission ?? ""]}
              </p>
            </div>
            {youtubeVideoId ? (
              <div className="flex-1 w-full h-full justify-center mt-2 overflow-hidden">
                <iframe
                  title="YouTube Video"
                  className="w-full h-full"
                  allow="fullscreen"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                />
              </div>
            ) : (
              <img
                src={`../images/illustrations/illustration-${randomIllustrationIdx}.png`}
                alt="Illustration"
                className="hidden lg:block absolute lg:w-[60vh] opacity-50 bottom-0 right-0"
              />
            )}
          </div>
          {event?.related_events.length > 0 && (
            <aside className="flex-[30%] w-full h-full pb-10 lg:pb-0 my-2">
              <div className="bg-bv-white lg:h-full rounded-xl p-6 lg:px-4 xl:px-6">
                <div className="flex items-center">
                  <h1 className="text-black text-[2vh] lg:text-[2.6vh] font-semibold">
                    Related Events
                  </h1>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {event?.related_events.map((relatedEvent: number) => (
                    <React.Fragment key={relatedEvent}>
                      {(events[relatedEvent - 1].permission !== "private" ||
                        loggedIn) && (
                        <Link
                          to={`/events/${relatedEvent}`}
                          key={relatedEvent}
                          className="text-black text-[1.5vh] hover:underline"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 min-w-4 min-h-4 rounded-sm shadow-md bg-${activityToColour[events[relatedEvent - 1].event_type]}`}
                            />
                            {events[relatedEvent - 1].name}
                          </div>
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventDetail;
