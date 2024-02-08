import { useAtom } from "jotai";
import { loginModalAtom } from "./Navbar";
import { useState } from "react";

const Login = () => {
  const setLoginModalOpen = useAtom(loginModalAtom)[1];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hi");
    const correctUsername = "admin";
    const correctPassword = "password";

    if (username === correctUsername && password === correctPassword) {
      console.log("Login successful!");
      setLoginModalOpen(false);
    } else {
      console.log("Incorrect username or password");
      setIncorrect(true);
    }
  };

  return (
    <>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-medium-blue shadow-lg px-5 py-8 rounded-md z-[10001]">
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <button
            className="absolute top-2 right-3 text-red-400"
            onClick={() => setLoginModalOpen(false)}
          >
            ✖
          </button>
          <p className="text-md">Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-md">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={`text-xs mt-2 ${!incorrect && "invisible"}`}>
            Incorrect username or password!
          </p>
          <button
            className="text-md w-fit bg-light-pink px-2 py-1 rounded-lg shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="absolute left-0 top-0 w-screen h-screen bg-black opacity-40 z-[10000]" />
    </>
  );
};

export default Login;
