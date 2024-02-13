import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { loginModalAtom } from "./Navbar";
import React, { useState } from "react";
import Modal from "./Modal";

export const loggedInAtom = atomWithStorage("loggedIn", false);

const Login: React.FC = () => {
  const setLoginModalOpen = useAtom(loginModalAtom)[1];
  const setLoggedIn = useAtom(loggedInAtom)[1];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showIncorrect, setShowIncorrect] = useState(false);

  const handleLogin = () => {
    const correctUsername = "user";
    const correctPassword = "pass";

    if (username === correctUsername && password === correctPassword) {
      setLoggedIn(true);
      setLoginModalOpen(false);
    } else {
      setShowIncorrect(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Modal onClose={() => setLoginModalOpen(false)}>
      <div className="flex flex-col items-center gap-2">
        <button
          className="absolute top-2 right-3 text-red-400 text-lg"
          onClick={() => setLoginModalOpen(false)}
        >
          ✖
        </button>
        <h1 className="font-bold text-2xl">Login</h1>
        <p className="text-md w-full">Username</p>
        <input
          type="text"
          className="border-bv-grey border-2 rounded-md p-[1vh] w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p className="text-md w-full">Password</p>
        <input
          type="password"
          className="border-bv-grey border-2 rounded-md p-[1vh] w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p className={`text-xs mt-2 ${!showIncorrect && "invisible"}`}>
          Incorrect username or password!
        </p>
        <button
          className="text-md w-[100%] bg-medium-pink p-[1vh] rounded-lg shadow-lg text-shadow"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </Modal>
  );
};

export default Login;
