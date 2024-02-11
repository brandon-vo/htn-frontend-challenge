import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { loggedInAtom } from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmerica } from "@fortawesome/free-solid-svg-icons";

export const loginModalAtom = atom(false);

const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useAtom(loginModalAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  return (
    <nav className="absolute w-full py-6 px-12 md:px-20 z-[9999]">
      <ul className="flex items-center py-2">
        <li>
          <Link className="font-bold" to="/">
            <FontAwesomeIcon
              className="text-light-pink mr-1"
              icon={faEarthAmerica}
            />
            <span className="text-light-pink">Hackathon</span> Global
          </Link>
        </li>
        <li className="ml-auto">
          {loggedIn ? (
            <button
              className="py-2 w-[85px] rounded-md bg-gradient-to-r from-red-500 to-red-200 shadow-md text-shadow"
              onClick={() => setLoggedIn(false)}
            >
              Logout
            </button>
          ) : (
            <button
              className="py-2 w-[85px] rounded-md bg-gradient-to-r from-green-500 to-green-200 shadow-md text-shadow"
              onClick={() => setLoginModalOpen(!isLoginModalOpen)}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
