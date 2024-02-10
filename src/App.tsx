import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Navbar, { loginModalAtom } from "./components/Navbar";
import Login from "./components/Login";
import getEvents, { eventAtom } from "./getEvents";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const isLoginModalOpen = useAtom(loginModalAtom)[0];
  const setEvents = useAtom(eventAtom)[1];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents();
      // console.log(data);
      setEvents(data);
    };
    fetchData();
  }, [setEvents]);

  return (
    <BrowserRouter>
      <Navbar />
      {isLoginModalOpen && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
