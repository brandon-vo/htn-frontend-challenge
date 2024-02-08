import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { loginModalAtom } from "./components/Navbar";
import { useAtom } from "jotai";
import Login from "./components/Login";

function App() {
  const isLoginModalOpen = useAtom(loginModalAtom)[0];
  return (
    <BrowserRouter>
      <Navbar />
      {isLoginModalOpen && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
