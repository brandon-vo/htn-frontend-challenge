import { useEffect, useState } from "react";
import { TEvent } from "../types";
import { useAtom } from "jotai";
import { apiDataAtom } from "../getApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { loggedInAtom } from "../components/Login";
import { format } from "date-fns";

const activityToLabel: { [key: string]: string } = {
  workshop: "Workshop",
  activity: "Activity",
  tech_talk: "Tech Talk",
};

const getYoutubeVideoId = (url: string) => {
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]+)/,
  );
  return videoIdMatch ? videoIdMatch[1] : null;
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiData = useAtom(apiDataAtom)[0];
  const loggedIn = useAtom(loggedInAtom)[0];
  const [event, setEvent] = useState<TEvent>();

  useEffect(() => {
    const eventId = Number(id);
    const event = apiData.find((event: TEvent) => event.id === eventId);
    setEvent(event);
    console.log(event);
  }, [apiData]);

  useEffect(() => {
    if (!loggedIn && event?.permission === "private") {
      alert("You must be logged in to view this event");
      navigate("../events");
    }
  }, [event, loggedIn]);

  const youtubeVideoId = event?.public_url?.includes("youtu.be")
    ? getYoutubeVideoId(event?.public_url)
    : null;

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-start w-full mt-[70px] px-12 md:px-34 lg:px-32 2xl:px-80">
        <div className="flex flex-col">
          <Link to="../events/" className="z-[20000]">
            <h1 className="font-bold text-[4vh] text-gray-500 mt-1">
              Upcoming Events
            </h1>
          </Link>
          <div className="flex ml-2 md:ml-6">
            <h1 className="font-bold text-[2vh] md:text-[2.5vh] text-bv-white mr-2">
              {">"}
            </h1>
            <h1 className="font-bold text-[2vh] md:text-[2.5vh] text-bv-white ">
              {event?.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full h-full mb-12 md:gap-4">
          <div className="flex-[75%] bg-bv-white w-full h-full my-2 p-6 rounded-xl">
            <div className="flex items-center">
              <div className="flex flex-col">
                <h1 className="text-black text-[2.2vh] font-semibold">
                  {activityToLabel[event?.event_type || ""] ?? "Event"}
                </h1>
                {event?.start_time && (
                  <p className="text-[1.2vh] text-gray-500">
                    {format(
                      new Date(event?.start_time as number),
                      "MMM dd, yyyy • h:mm a",
                    )}{" "}
                    - {format(new Date(event.end_time), "h:mm a")}
                  </p>
                )}
                <div className="flex gap-1 my-1">
                  <p className="text-gray-600 text-[1.5vh]">Presented by</p>
                  {event?.speakers.map((speaker: any) => (
                    <p
                      key={speaker.name}
                      className="text-gray-600 text-[1.5vh]"
                    >
                      {speaker.name}
                    </p>
                  ))}
                </div>
              </div>
              {loggedIn && (
                <a
                  className="ml-auto text-bv-white text-shadow rounded-full bg-medium-pink hover:bg-dark-pink transition py-2 px-12"
                  target="_blank"
                  href={event?.private_url}
                >
                  Link
                </a>
              )}
            </div>
            <p className="text-black text-[1.7vh] my-2">{event?.description}</p>

            {youtubeVideoId && (
              <div className="flex-1 w-full h-[30vh] md:h-[40vh] justify-center my-8">
                <iframe
                  style={{ width: "80%", height: "100%" }}
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                ></iframe>
              </div>
            )}
          </div>

          <div className="flex-[25%] w-full h-full min-h-[500px] pb-10 md:pb-0 my-2">
            {/* <h1>Related Events</h1> */}
            <div className="bg-bv-white h-full rounded-xl p-6">
              {/* Related events go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
