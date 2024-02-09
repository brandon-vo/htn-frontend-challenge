import { Link } from "react-router-dom";
import Background from "../components/Background";

const Home: React.FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col h-full items-left justify-center p-[5vw] md:p-[11vw] lg:p-[14vw]">
        <h1 className="font-bold text-bv-white text-[6vh] md:text-[8vh] leading-none ml-[-5px] drop-shadow-xl">
          <span className="text-light-pink">Hackathon</span> Global
        </h1>
        <p className="font-medium italic font-bitter text-bv-grey text-[1.5vh]">
          Hacking since 2013
        </p>
        <Link
          className="w-fit px-6 py-3 my-2 bg-medium-pink hover:bg-dark-pink text-bv-white 
            rounded-xl shadow-lg transition text-shadow"
          to="/events"
        >
          Events
        </Link>
      </div>

      <Background />
    </div>
  );
};

export default Home;
