// Importiert CSS für den Datepicker und nötige React-Hooks
import "react-datepicker/dist/react-datepicker.css";
import { useState, useContext, useEffect, useRef } from "react";
import { RefreshContext } from "../components/Handler";

// ReservierungAdd-Komponente, die 'boote' als Prop annimmt
const ReservierungAdd = ({ boote }) => {
  // State-Hooks für die Start- und Enddaten sowie für die Auswahlstatus
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  // State für verfügbare Boote, initial leer
  const [aviableBoote, setAviableBoote] = useState([]);

  // Ref-Hooks für Start- und Enddatum-Inputfelder
  const startRef = useRef();
  const endRef = useRef();

  // useContext-Hook, um den Refresh-Kontext zu nutzen
  const refresh = useContext(RefreshContext);

  // Funktion zur Hinzufügung einer Reservierung, ausgelöst beim Formular-Submit
  const addResv = async (event) => {
    event.preventDefault(); // Verhindert die Standard-Formular-Übermittlung

    const form = new FormData(event.target);

    // Sendet die Daten zum Backend für Reservierungs- und Bootserstellung
    await fetch(import.meta.env.VITE_BACKENDURL + "/reservierung/add", {
      method: "POST",
      body: form,
    });

    await fetch(import.meta.env.VITE_BACKENDURL + "/boot/addResv", {
      method: "PUT",
      body: form,
    });

    // Aktualisiert die Ansicht, indem der Refresh-Kontext geändert wird
    refresh((prev) => !prev);
  };

  // Funktion, die verfügbare Boote vom Server abruft
  const getAviableBoot = async () => {
    return await fetch(import.meta.env.VITE_BACKENDURL + "/boot/getAviable", {
      method: "POST",
      body: JSON.stringify({
        start: startRef.current.value,
        end: endRef.current.value,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  };

  // useEffect-Hook, der getAviableBoot aufruft, wenn beide Daten ausgewählt wurden
  useEffect(() => {
    if (startSelected && endSelected) {
      getAviableBoot().then((data) => setAviableBoote(data));
    }
  }, [endSelected]);

  // Render-Funktion des Formulars zur Erstellung einer Reservierung
  return (
    <div className="flex w-fit m-auto border rounded-xl p-10">
      <form className="flex flex-col items-center" onSubmit={addResv}>
        {/* Input-Felder für Start- und Enddatum mit onChange-Handlern */}
        <input
          type="date"
          className="input border"
          name="Startdatum"
          id="Startdatum"
          ref={startRef}
          onChange={() => setStartSelected((prev) => !prev)}
        />

        <p>Bis</p>

        <input
          type="date"
          className="input "
          name="Enddatum"
          id="Enddatum"
          ref={endRef}
          onChange={() => setEndSelected((prev) => !prev)}
        />

        {/* Dropdown-Menü für die Auswahl eines Boots, deaktiviert, wenn Daten nicht gewählt sind */}
        <select
          className="select select-primary w-full max-w-xs"
          name="Boot"
          id="Boot"
          disabled={
            (startSelected == false) | (endSelected == false) ? true : false
          }
        >
          <option value="">
            {endSelected ? "Boot wählen" : "Zuerst Datum auswählen"}
          </option>
          {/* Mapping über verfügbare Boote für die Dropdown-Optionen */}
          {aviableBoote.map((elt, index) => {
            return (
              <option key={index} value={elt._id}>
                {elt.Seriennummer}
              </option>
            );
          })}
        </select>

        {/* Submit-Button für das Formular */}
        <input className="btn" type="submit" value="Erstellen" />
      </form>
    </div>
  );
};

export default ReservierungAdd;
