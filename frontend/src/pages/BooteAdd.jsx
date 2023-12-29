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
        {/* Weitere Eingabefelder folgen... */}
        {/* ... */}
        {/* 'Submit'-Button zum Absenden des Formulars */}
        <input className="btn" type="submit" value="Erstellen" />
      </form>
    </div>
  );
};

// Export der Komponente für die Verwendung in anderen Teilen der Anwendung
export default BooteAdd;
