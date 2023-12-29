// Importieren des Reservierungsmodells aus einer externen Datei
import { Reservierung } from "./model.js";

// Funktion zum Hinzufügen einer neuen Reservierung
export const addResv = async (req, res) => {
  // Erstellen einer neuen Instanz des Reservierungsmodells mit den im Request Body übermittelten Daten
  const reservierung = new Reservierung(req.body);

  // Ausgabe der Anfragedaten zur Überprüfung auf der Konsole
  console.log(req.body);

  try {
    // Versuch, die neue Reservierung in der Datenbank zu speichern
    await reservierung.save();

    // Senden einer HTTP 201-Antwort (Created), um den erfolgreichen Abschluss der Operation anzuzeigen
    res.status(201).end();
  } catch (error) {
    // Bei einem Fehler wird dieser auf der Konsole protokolliert
    console.log(error);

    // Senden einer HTTP 500-Antwort (Internal Server Error) im Fehlerfall
    res.status(500).end();
  }
};

// Funktion zum Abrufen aller Reservierungen
export const getResv = async (req, res) => {
  // Abrufen aller Reservierungsdatensätze aus der Datenbank
  const Reservierungen = await Reservierung.find();

  // Senden der abgerufenen Reservierungen als JSON-Antwort
  res.json(Reservierungen).end();
};

// Funktion zum Löschen einer spezifischen Reservierung
export const delResv = async (req, res) => {
  // Löschen der Reservierung mit der spezifizierten ID, die im Request Body übermittelt wird
  const response = await Reservierung.deleteOne({ _id: req.body.id });

  // Senden der Antwort vom Löschen als JSON-Antwort
  res.json(response).end();
};
