import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";

export const loginModalAtom = atom(false);

const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useAtom(loginModalAtom);

  return (
    <nav className="absolute w-full py-6 px-6 md:px-20 z-[9999]">
      <ul className="flex">
        <li>
          <Link className="font-bold" to="/">
            <span className="text-light-pink">Hackathon</span> Global
          </Link>
        </li>
        <li className="ml-auto">
          <button onClick={() => setLoginModalOpen(!isLoginModalOpen)}>
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
