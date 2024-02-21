import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  faFilter,
  faArrowDown19,
  faArrowUp19,
} from "@fortawesome/free-solid-svg-icons";
import { EventTypes, FilterType, FilterTypes } from "../../types/EventType";
import { activityToColour, activityToLabel } from "../../helpers/eventString";
import EventListHeaderButton from "./EventListHeaderButton";

export const eventFilterAtom = atomWithStorage<FilterType[]>(
  "eventFilter",
  EventTypes,
);
export const eventReverseDateAtom = atomWithStorage("eventDateSort", false);

const EventListHeader: React.FC = () => {
  const [eventFilter, setEventFilter] = useAtom(eventFilterAtom);
  const [showFilter, setShowFilter] = useState(false);
  const [beforeBookmarked, setBeforeBookmarked] =
    useState<FilterType[]>(EventTypes);
  const [reversedDates, setReversedDates] = useAtom(eventReverseDateAtom);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleEventType = (type: FilterType) => {
    if (type === "Bookmarked") {
      // If Bookmarked is already in the filter, set the filter to the state it was before filtering bookmarks
      if (eventFilter.includes("Bookmarked")) {
        setEventFilter(beforeBookmarked);
      } else {
        // Otherwise, save the state it was before filtering bookmarks, then remove the other filters
        setBeforeBookmarked(eventFilter);
        setEventFilter(["Bookmarked"]);
      }
    } else {
      setEventFilter((prevFilter) => {
        // If Bookmarked is in the filter, remove it and add the new type
        if (prevFilter.includes("Bookmarked")) {
          return [type];
        } else {
          // Otherwise, toggle the selected type
          if (prevFilter.includes(type)) {
            return prevFilter.filter((item) => item !== type);
          } else {
            return [...prevFilter, type];
          }
        }
      });
    }
  };

  const filterButtonID = "filterButton";
  const handleFilterClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (
      filterRef.current &&
      !filterRef.current.contains(clickedElement) &&
      clickedElement?.id !== filterButtonID
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
        className="tooltip absolute bottom-0 translate-y-[110%] translate-x-[25%] gap-1 bg-gray-200 shadow-xl rounded-sm w-[125px] h-[110px] p-2"
      >
        <div className="flex flex-col gap-1">
          {FilterTypes.map((type) => (
            <button
              className={`flex items-center gap-2 ${!eventFilter.includes(type) && "opacity-50"}`}
              key={type}
              onClick={() => toggleEventType(type)}
            >
              <div
                className={`w-4 h-4 min-w-4 min-h-4 rounded-sm shadow-md bg-${activityToColour[type] || "zinc-400"}`}
              />
              <p className="text-black text-sm">
                {activityToLabel[type] || type}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      id="category-labels"
      className="bg-bv-white p-4 py-2.5 mt-2 rounded-xl"
    >
      <div className="flex w-full items-center space-between px-[30px]">
        <div className="relative w-[40%]">
          <EventListHeaderButton
            buttonID={filterButtonID}
            label="Filter"
            onClick={() => setShowFilter(!showFilter)}
            icon={faFilter}
          />
          {showFilter && renderFilterTooltip()}
        </div>
        <p className="hidden md:block w-[15%] ml-[15px] text-end text-sm text-gray-600">
          Speakers
        </p>
        <p className="hidden md:block w-[15%] text-center text-sm text-gray-600">
          Invite
        </p>
        <div className="w-[15%] ml-auto md:ml-[25px]">
          <EventListHeaderButton
            label="Date"
            onClick={() => setReversedDates(!reversedDates)}
            icon={reversedDates ? faArrowUp19 : faArrowDown19}
          />
        </div>
      </div>
    </div>
  );
};

export default EventListHeader;
