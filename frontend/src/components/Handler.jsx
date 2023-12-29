import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Landing from "../pages/Landing";
import Boote from "../pages/Boote";
import BooteAdd from "../pages/BooteAdd";
import Reservierungen from "../pages/Reservierungen";
import ReservierungAdd from "../pages/ReservierungAdd";
import Aside from "./Aside";
import DetailPage from "../pages/Detailpage";

// Erstellen des React-Kontexts für die Aktualisierung der Anwendung
export const RefreshContext = createContext();

// Hauptkomponente für die Anwendung
const Handler = () => {
  // State-Hooks für Boote und Reservierungen
  const [boote, setBoote] = useState([]);
  const [reservierungen, setResv] = useState([]);

  // State-Hook für die Steuerung der Datenaktualisierung
  const [refresh, setRefresh] = useState(false);

  // useEffect-Hook, um Boote beim Laden der Komponente oder bei Änderungen an 'refresh' abzurufen
  useEffect(() => {
    const fetchBoote = async () => {
      // Abrufen der Boot-Daten vom Server
      const Boote = await fetch(
        import.meta.env.VITE_BACKENDURL + "/boot/get"
      ).then((res) => res.json());

      // Aktualisieren des State mit den abgerufenen Boot-Daten
      setBoote(Boote);
    };
    fetchBoote();
  }, [refresh]);

  // useEffect-Hook, um Reservierungen beim Laden der Komponente oder bei Änderungen an 'refresh' abzurufen
  useEffect(() => {
    const fetchResv = async () => {
      // Abrufen der Reservierungsdaten vom Server
      const Resv = await fetch(
        import.meta.env.VITE_BACKENDURL + "/reservierung/get"
      ).then((res) => res.json());

      // Aktualisieren des State mit den abgerufenen Reservierungsdaten
      setResv(Resv);
    };
    fetchResv();
  }, [refresh]);

  // Render-Methode der Komponente
  return (
    // Bereitstellen des Refresh-Kontexts für Kinderkomponenten
    <RefreshContext.Provider value={setRefresh}>
      <BrowserRouter>
        {/* Seitenleiste-Komponente */}
        <Aside />
        <Routes>
          {/* Route-Konfigurationen für verschiedene Seiten der Anwendung */}
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

export default Handler;
