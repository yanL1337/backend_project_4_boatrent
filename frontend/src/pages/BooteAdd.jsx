// Importieren notwendiger Hooks und Komponenten aus React und anderen Dateien
import { useContext } from "react";
import { RefreshContext } from "../components/Handler";

// Die Komponente `BooteAdd` für das Hinzufügen neuer Boote
const BooteAdd = () => {
  // Verwendung des useContext Hooks, um auf den RefreshContext zuzugreifen
  // Dies wird wahrscheinlich genutzt, um die Ansicht zu aktualisieren, wenn ein neues Boot hinzugefügt wird
  const refresh = useContext(RefreshContext);

  // Die Funktion `addBoot` wird aufgerufen, wenn das Formular gesendet wird
  const addBoot = async (event) => {
    // Verhindert die Standardaktion des Formulars beim Senden
    event.preventDefault();

    // Erstellen eines FormData Objekts aus dem gesendeten Formular
    const form = new FormData(event.target);

    // Sendet eine POST-Anfrage an den Server mit den Formulardaten
    // Die URL des Backends wird aus den Umgebungsvariablen geladen
    await fetch(import.meta.env.VITE_BACKENDURL + "/boot/add", {
      method: "POST",
      body: form,
    });

    // Aktualisiert den Zustand in `RefreshContext`, um die Anzeige zu aktualisieren
    // Wahrscheinlich um die Liste der Boote neu zu laden
    refresh((prev) => !prev);
  };

  // Das Rendern des Formulars zur Eingabe der Bootsinformationen
  return (
    <div className="w-fit flex m-auto">
      <form className="flex flex-col" onSubmit={addBoot}>
        {/* Eingabefelder für verschiedene Bootseigenschaften wie Baujahr, Seriennummer, etc. */}
        {/* Jedes Feld verwendet Tailwind CSS Klassen für das Styling */}
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          id="Baujahr"
          name="Baujahr"
          placeholder="Baujahr.."
        />
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          id="Seriennummer"
          name="Seriennummer"
          placeholder="Seriennummer..."
        />
        <select
          name="Material"
          className="select select-primary w-full max-w-xs"
          id="Material"
        >
          <option value="Seelen">Seelen</option>
          <option value="GFK">GFK</option>
          <option value="Holz">Holz</option>
          <option value="Metall">Metall</option>
          <option value="Pappe">Pappe</option>
        </select>
        <select
          className="select select-primary w-full max-w-xs"
          name="Bootsart"
          id="Bootsart"
        >
          <option value="Tretboot">Tretboot</option>
          <option value="Segelboot">Segelboot</option>
          <option value="Luftkissenboot">Luftkissenboot</option>
          <option value="Geisterschiff">Geisterschiff</option>
          <option value="Containerschiff">Containerschiff</option>
        </select>
        <input
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          type="file"
          id="imgLink"
          name="imgLink"
        />
        <input className="btn" type="submit" value="Erstellen" />
      </form>
    </div>
  );
};

// Export der Komponente für die Verwendung in anderen Teilen der Anwendung
export default BooteAdd;
