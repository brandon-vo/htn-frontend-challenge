import { format } from "date-fns";
import { permissionToLabel } from "../../helpers/eventString";
import { TEvent } from "../../types/EventType";

interface EventRowProps {
  event: TEvent;
}

// For medium sized and up screens
const EventRow: React.FC<EventRowProps> = ({ event }) => {
  return (
    <>
      <div className="justify-end w-[15%] hidden md:flex">
        {event.speakers.map((speaker: any) => (
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
            {permissionToLabel[event.permission || ""]}
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
    </>
  );
};

export default EventRow;
