import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { loginModalAtom } from "../Navbar";
import React, { useState } from "react";
import Modal from "../Modal";

export const loggedInAtom = atomWithStorage("loggedIn", false);

const Login: React.FC = () => {
  const setLoginModalOpen = useAtom(loginModalAtom)[1];
  const setLoggedIn = useAtom(loggedInAtom)[1];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showIncorrect, setShowIncorrect] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    const correctUsername = "htn";
    const correctPassword = "htn";

    if (username === correctUsername && password === correctPassword) {
      setLoggedIn(true);
      setLoginModalOpen(false);
    } else {
      setShowIncorrect(true);
    }
    e.preventDefault();
  };

  const inputClasses =
    "border-bv-grey border-2 rounded-md p-[1vh] w-full text-black";

  return (
    <Modal onClose={setLoginModalOpen} className="min-w-[400px]">
      <form className="flex flex-col items-center gap-2" onSubmit={handleLogin}>
        <h1 className="font-bold text-2xl">Login</h1>
        <label className="text-md w-full">Username</label>
        <input
          type="text"
          className={inputClasses}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-md w-full">Password</label>
        <input
          type="password"
          className={inputClasses}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={`text-xs mt-2 ${!showIncorrect && "invisible"}`}>
          Incorrect username or password!
        </p>
        <button
          className="text-md w-[100%] bg-medium-pink p-[1vh] rounded-lg shadow-lg text-shadow"
          type="submit"
        >
          Login
        </button>
      </form>
    </Modal>
  );
};

export default Login;
