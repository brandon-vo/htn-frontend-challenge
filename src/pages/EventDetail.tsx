import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { format } from "date-fns";
import { loggedInAtom } from "../components/Login";
import { TEvent } from "../types";
import { eventAtom } from "../getEvents";
import { activityToColour, activityToLabel } from "../helpers/eventString";

const getYoutubeVideoId = (url: string) => {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]+)/,
  );
  return videoIdMatch ? videoIdMatch[1] : null;
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedIn = useAtom(loggedInAtom)[0];
  const events = useAtom(eventAtom)[0];
  const [event, setEvent] = useState<TEvent>();

  useEffect(() => {
    const eventId = Number(id);
    const event = events[eventId - 1];
    setEvent(event);
    // console.log(event);
  }, [events, id]);

  useEffect(() => {
    if (!loggedIn && event?.permission === "private") {
      alert("You must be logged in to view this event");
      navigate("../events");
    }
  }, [event, loggedIn, navigate]);

  const youtubeVideoId = event?.public_url?.includes("youtu.be")
    ? getYoutubeVideoId(event?.public_url)
    : null;

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-start w-full mt-[70px] px-12 lg:px-34 lg:px-32 2xl:px-80">
        <div className="flex flex-col">
          <Link to="../events/" className="z-[20000]">
            <h1 className="font-bold text-[4vh] text-gray-500 mt-1">
              Upcoming Events
            </h1>
          </Link>
          <div className="flex ml-2 lg:ml-6">
            <h1 className="font-bold text-[2vh] lg:text-[2.5vh] text-bv-white mr-2">
              {">"}
            </h1>
            <h1 className="font-bold text-[2vh] lg:text-[2.5vh] text-bv-white ">
              {activityToLabel[event?.event_type || ""] ?? "Event"}
            </h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full mb-12 lg:gap-4">
          <div className="flex flex-col flex-[75%] bg-bv-white w-full h-full my-2 p-6 rounded-xl">
            <div className="flex items-center">
              <div className="flex flex-col">
                <h1 className="text-black text-[2vh] lg:text-[2.3vh] font-semibold">
                  {event?.name}
                </h1>
                {event?.start_time && (
                  <p className="text-[1.2vh] lg:text-[1.5vh] text-gray-500">
                    {format(
                      new Date(event?.start_time as number),
                      "MMM dd, yyyy • h:mm a",
                    )}{" "}
                    - {format(new Date(event.end_time), "h:mm a")}
                  </p>
                )}
                {event && event.speakers?.length > 0 && (
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
                  className="ml-auto mb-auto text-bv-white text-shadow rounded-full bg-medium-pink hover:bg-dark-pink transition py-2 px-12"
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
            {event?.permission === "private" ? (
              <p className="text-gray-500 italic">Event for Hackers</p>
            ) : (
              <p className="text-gray-500 italic">Event for Everyone</p>
            )}
            {youtubeVideoId && (
              <div className="flex-1 w-full h-[30vh] lg:h-[40vh] justify-center mt-2">
                <iframe
                  title="YouTube Video"
                  style={{ width: "100%", height: "100%" }}
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                ></iframe>
              </div>
            )}
          </div>
          {event && event.related_events?.length > 0 && (
            <div className="flex-[30%] w-full h-full min-h-[500px] pb-10 lg:pb-0 my-2">
              <div className="bg-bv-white lg:h-full rounded-xl p-6">
                <div className="flex items-center">
                  <h1 className="text-black text-[2vh] lg:text-[2.6vh] font-semibold">
                    Related Events
                  </h1>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {event?.related_events.map((relatedEvent: number) => (
                    <>
                      {(events[relatedEvent - 1].permission !== "private" ||
                        loggedIn) && (
                        <Link
                          to={`/events/${relatedEvent}`}
                          key={relatedEvent}
                          className="text-black text-[1.5vh] hover:underline"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-sm shadow-md bg-${activityToColour[events[relatedEvent - 1].event_type]}`}
                            />
                            {events[relatedEvent - 1].name}
                          </div>
                        </Link>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
