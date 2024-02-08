import { Link } from "react-router-dom";
import Background from "../components/Background";

const Home = () => {
  return (
    <div className="flex w-screen h-screen bg-gradient-to-tl from-medium-blue to-dark-blue">
      <div className="flex flex-col h-full items-left justify-center p-[5vw] md:p-[11vw] lg:p-[14vw]">
        <h1 className="font-bold text-bv-white text-[6vh] md:text-[8vh] leading-none ml-[-5px] drop-shadow-xl">
          <span className="text-light-pink">Hackathon</span> Global
        </h1>
        <p className="font-medium italic font-bitter text-bv-grey text-[1.5vh]">
          Hacking since 2013
        </p>
        <Link
          className="w-fit px-6 py-3 my-2 bg-light-pink hover:bg-dark-pink text-bv-white 
            rounded-xl shadow-lg transition [text-shadow:_1px_1px_4px_rgb(0_0_0_/_80%)]"
          to="/events"
        >
          Public Events
        </Link>
      </div>

      <Background />
    </div>
  );
};

export default Home;
