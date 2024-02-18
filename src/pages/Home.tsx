import { atom, useAtom } from "jotai";
import { Link } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Background from "../components/Background";
import Info from "../components/Modals/Info";

export const infoModalAtom = atom(false);

const Home: React.FC = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useAtom(infoModalAtom);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col h-full items-left justify-center p-[5vw] md:p-[11vw] lg:p-[14vw]">
        <h1 className="font-bold text-bv-white text-[4.5vh] md:text-[8vh] leading-none ml-[-5px] drop-shadow-xl">
          <span className="text-light-pink">Hackathon</span> Global
        </h1>
        <p className="font-medium italic font-bitter text-bv-grey text-[1.5vh]">
          Hacking since 2013
        </p>
        <Link
          className="w-fit px-4 py-2 lg:px-6 lg:py-3 my-2 bg-medium-pink hover:bg-dark-pink text-bv-white 
            rounded-xl shadow-lg transition text-shadow"
          to="/events"
        >
          Events
        </Link>
      </div>
      <Background />
      <FontAwesomeIcon
        icon={faInfoCircle}
        onClick={() => setInfoModalOpen(!isInfoModalOpen)}
        tabIndex={0}
        className="text-bv-white text-lg absolute bottom-10 right-10 hover:scale-110 hover:text-bv-grey transition shadow-lg"
      />
      {isInfoModalOpen && <Info />}
    </div>
  );
};

export default Home;
