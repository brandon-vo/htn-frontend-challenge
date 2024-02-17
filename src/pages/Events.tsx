import { atom, useAtom } from "jotai";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import EventList from "../components/Events/EventList";
import EventListHeader from "../components/Events/EventListHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const searchFilterAtom = atom<string>("");

const Events: React.FC = () => {
  const setSearch = useAtom(searchFilterAtom)[1];
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col items-start w-full mt-[70px] p-12 md:px-34 lg:px-32 2xl:px-80">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-[2.3vh] md:text-[3vh] lg:text-[4vh] my-1">
            Upcoming Events
          </h1>
          <div className="flex items-center bg-white h-[30px] md:h-[40px] w-[25vw] md:w-[40vw] md:max-w-[300px] py-2 px-4 rounded-xl shadow-xl">
            <input
              type="text"
              placeholder="Search"
              className=" text-black text-sm w-full mr-2 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="text-[1.2vh] text-gray-600 ml-auto"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <EventListHeader />
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Events;
