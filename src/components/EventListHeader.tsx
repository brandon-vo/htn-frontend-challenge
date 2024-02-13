import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  faFilter,
  faArrowDown19,
  faArrowUp19,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventTypes } from "../types/EventType";
import { activityToColour, activityToLabel } from "../helpers/eventString";

export const eventFilterAtom = atomWithStorage("eventFilter", EventTypes);
export const eventReverseDateAtom = atomWithStorage("eventDateSort", false);

const EventListHeader: React.FC = () => {
  const [eventFilter, setEventFilter] = useAtom(eventFilterAtom);
  const [showFilter, setShowFilter] = useState(false);
  const [reversedDates, setReversedDates] = useAtom(eventReverseDateAtom);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleEventType = (type: any) => {
    if (eventFilter.includes(type)) {
      setEventFilter(eventFilter.filter((item) => item !== type));
    } else {
      setEventFilter([...eventFilter, type]);
    }
  };

  const filterButtonID = "filterButton";
  const handleFilterClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const parentElement = clickedElement.parentElement;
    if (
      filterRef.current &&
      !filterRef.current.contains(clickedElement) &&
      parentElement?.id !== filterButtonID
    ) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleFilterClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleFilterClickOutside);
    };
  }, []);

  const renderFilterTooltip = () => {
    return (
      <div
        ref={filterRef}
        className="tooltip absolute bottom-0 translate-y-[110%] translate-x-[30%] gap-1 bg-gray-200 shadow-xl rounded-sm w-[110px] h-[90px] p-2"
      >
        <div className="flex flex-col gap-1">
          {EventTypes.map((type) => (
            <button
              className={`flex items-center gap-2 ${!eventFilter.includes(type) && "opacity-50"}`}
              key={type}
              onClick={() => toggleEventType(type)}
            >
              <div
                className={`w-4 h-4 rounded-sm shadow-md bg-${activityToColour[type]}`}
              />
              <p className="text-black text-sm">{activityToLabel[type]}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="category-labels" className="bg-bv-white p-4 py-3 mt-2 rounded-xl">
      <div className="flex w-full items-center space-between px-[30px]">
        <div className="relative w-[40%]">
          <button
            className="flex items-center gap-1"
            id={filterButtonID}
            onClick={() => setShowFilter(!showFilter)}
          >
            <p className="text-sm text-gray-600">Event</p>
            <FontAwesomeIcon
              icon={faFilter}
              className="text-[1.2vh] text-gray-600 hover:text-black transition"
            />
          </button>
          {showFilter && renderFilterTooltip()}
        </div>
        <p className="hidden md:block w-[15%] ml-[15px] text-end text-sm text-gray-600">
          Speakers
        </p>
        <p className="hidden md:block w-[15%] text-center text-sm text-gray-600">
          Invite
        </p>
        <div className="w-[15%] ml-auto md:ml-[25px]">
          <button
            onClick={() => setReversedDates(!reversedDates)}
            className="flex items-center gap-1"
          >
            <p className="text-sm text-gray-600">Date</p>
            <FontAwesomeIcon
              icon={reversedDates ? faArrowUp19 : faArrowDown19}
              className="text-[1.4vh] text-gray-600 hover:text-black transition"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventListHeader;
