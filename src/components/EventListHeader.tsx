import { useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventTypes } from "../types/EventType";
import { activityToColour, activityToLabel } from "../helpers/eventString";

export const eventFilterAtom = atomWithStorage("eventFilter", EventTypes);

const EventListHeader: React.FC = () => {
  const [eventFilter, setEventFilter] = useAtom(eventFilterAtom);
  const [showFilter, setShowFilter] = useState(false);

  const toggleEventType = (type: any) => {
    if (eventFilter.includes(type)) {
      setEventFilter(eventFilter.filter((item) => item !== type));
    } else {
      setEventFilter([...eventFilter, type]);
    }
  };

  return (
    <div id="category-labels" className="bg-bv-white p-4 py-3 mt-2 rounded-xl">
      <div className="flex w-full items-center space-between px-[30px]">
        <div className="flex relative w-[40%] items-center gap-1">
          <p className="text-sm text-gray-600">Event</p>
          <button onClick={() => setShowFilter(!showFilter)}>
            <FontAwesomeIcon
              icon={faFilter}
              className="text-[1.2vh] text-gray-600 hover:text-black transition"
            />
          </button>
          {showFilter && (
            <div className="tooltip absolute bottom-0 translate-y-[110%] translate-x-[30%] gap-1 bg-gray-200 shadow-xl rounded-sm w-[110px] h-[90px] p-2">
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
                    <p className="text-black text-sm">
                      {activityToLabel[type]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="hidden md:block w-[15%] ml-[15px] text-end text-sm text-gray-600">
          Speakers
        </p>
        <p className="hidden md:block w-[15%] text-center text-sm text-gray-600">
          Invite
        </p>
        <p className="hidden md:block w-[15%] ml-[25px] text-sm text-gray-600">
          Date
        </p>
        {/* <div className="w-[15%] ml-auto">
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="w-full rounded-full border-2 border-bv-white text-black"
                  placeholder="Search"
                />
              </div> */}
      </div>
    </div>
  );
};

export default EventListHeader;
