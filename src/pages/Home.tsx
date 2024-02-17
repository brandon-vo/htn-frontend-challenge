import { useState } from "react";
import { Link } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Background from "../components/Background";
import Modal from "../components/Modal";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleInfoClick = () => {
    setShowModal(true);
  };
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
        onClick={handleInfoClick}
        className="text-bv-white text-lg absolute bottom-10 right-10 hover:scale-110 hover:text-bv-grey transition shadow-lg"
      />
      {showModal && (
        <Modal onClose={setShowModal} className="w-[85%] xl:w-[25%]">
          <div className="flex flex-col gap-1">
            <p>
              This site was built for the take-home challenge for the Hack the
              North 2024 Frontend application.
            </p>
            <p>Created by Brandon Vo</p>
            <a
              href="https://github.com/brandon-vo/htn-frontend-challenge"
              target="_blank"
              rel="noreferrer"
              className="text-light-pink hover:text-medium-pink underline"
            >
              https://github.com/brandon-vo/htn-frontend-challenge
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
