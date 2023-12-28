import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Boote from "../pages/Boote";
import BooteAdd from "../pages/BooteAdd";
import { createContext, useEffect, useState } from "react";
import Reservierungen from "../pages/Reservierungen";
import ReservierungAdd from "../pages/ReservierungAdd";
import Aside from "./Aside";
import DetailPage from "../pages/Detailpage";

const Handler = () => {
  const [boote, setBoote] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [reservierungen, setResv] = useState([]);

  useEffect(() => {
    const fetchBoote = async () => {
      const Boote = await fetch(
        import.meta.env.VITE_BACKENDURL + "/boot/get"
      ).then((res) => res.json());

      setBoote(Boote);
    };
    fetchBoote();
  }, [refresh]);

  useEffect(() => {
    const fetchResv = async () => {
      const Resv = await fetch(
        import.meta.env.VITE_BACKENDURL + "/reservierung/get"
      ).then((res) => res.json());

      setResv(Resv);
    };
    fetchResv();
  }, [refresh]);

  return (
    <RefreshContext.Provider value={setRefresh}>
      <BrowserRouter>
        <Aside />
        <Routes>
          <Route
            path="/"
            element={<Landing boote={boote} resv={reservierungen} />}
          />
          <Route path="/Boote" element={<Boote boote={boote} />} />
          <Route path="/Boote/Add" element={<BooteAdd />} />
          <Route
            path="/Reservierungen"
            element={<Reservierungen resv={reservierungen} />}
          />
          <Route
            path="/Reservierung/Add"
            element={<ReservierungAdd boote={boote} />}
          />
          <Route path="/boot/:id" element={<DetailPage boote={boote} />} />
        </Routes>
      </BrowserRouter>
    </RefreshContext.Provider>
  );
};
export const RefreshContext = createContext();
export default Handler;
