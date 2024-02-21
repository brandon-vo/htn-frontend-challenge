import { format } from "date-fns";
import { activityToLabel, permissionToLabel } from "../../helpers/eventString";
import { TEvent } from "../../types/EventType";

interface EventColumnProps {
  event: TEvent;
}

// For mobile and small screens
const EventColumn: React.FC<EventColumnProps> = ({ event }) => {
  return (
    <div className="block md:hidden">
      <p className="list-font-size-sm text-gray-500">
        {format(new Date(event.start_time), "MMM dd, yyyy • h:mm a")} -{" "}
        {format(new Date(event.end_time), "h:mm a")}
      </p>
      <p className="text-[1.5vh] text-gray-400">
        {activityToLabel[event.event_type || ""] ?? "Event"}
        {event.speakers.length > 0 &&
          ` by ${event.speakers.map((speaker: any) => speaker.name).join(", ")}`}
      </p>
      <p className="text-[1.5vh] text-gray-400">
        For {permissionToLabel[event.permission || ""]}
      </p>
    </div>
  );
};

export default EventColumn;
