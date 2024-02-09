import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Navbar, { loginModalAtom } from "./components/Navbar";
import Login from "./components/Login";
import getApi, { apiDataAtom } from "./getApi";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const isLoginModalOpen = useAtom(loginModalAtom)[0];
  const setApiData = useAtom(apiDataAtom)[1];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApi();
      // console.log(data);
      setApiData(data);
    };
    fetchData();
  }, [setApiData]);

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
