import { atom, useAtom } from "jotai";
import { Link } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Background from "../components/Home/Background";
import Info from "../components/Home/Info";

export const infoModalAtom = atom(false);

const Home: React.FC = () => {
  const [isInfoModalOpen, setInfoModalOpen] = useAtom(infoModalAtom);

  return (
    <main className="flex w-screen h-screen">
      <div className="flex flex-col h-full items-left justify-center p-[5vw] md:p-[11vw] lg:p-[14vw]">
        <h1
          className="font-bold text-bv-white text-[4.5vh] md:text-[8vh] leading-none ml-[-5px] drop-shadow-xl
                      [text-shadow:_-2px_-2px_10px_rgb(254_254_254_/_40%)]"
        >
          <span className="text-light-pink [text-shadow:_-2px_-2px_10px_rgb(220_182_227_/_40%)]">
            Hackathon
          </span>{" "}
          Global
        </h1>
        <small className="font-medium italic font-bitter text-bv-grey text-[1.2vh] md:text-[1.5vh]">
          Celebrating a decade of innovation for hackers worldwide
        </small>
        <Link
          className="w-fit px-4 py-2 lg:px-6 lg:py-3 my-2 bg-medium-pink hover:bg-dark-pink text-bv-white 
            rounded-xl shadow-lg transition text-shadow text-[1.5vh] md:text-md"
          to="/events"
        >
          Events
        </Link>
      </div>
      <Background />
      <button
        onClick={() => setInfoModalOpen(!isInfoModalOpen)}
        className="group"
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-bv-white text-lg absolute bottom-10 right-10 hover:scale-105
          hover:text-bv-grey transition shadow-lg group-focus:outline outline-offset-2 outline-2"
        />
      </button>
      {isInfoModalOpen && <Info />}
    </main>
  );
};

export default Home;
