import { Boot } from "./model.js";
import { fileTypeFromBuffer } from "file-type";
import { v4 } from "uuid";
import fs from "fs/promises";

const DIR = "./uploads/";

// Fügt ein neues Boot zur Datenbank hinzu
export const addBoot = async (req, res) => {
  console.log(req.body); // Loggt die Anfragedaten
  console.log(req.file); // Loggt die Dateiinformationen

  // Bestimmt den Dateityp der hochgeladenen Datei und generiert einen Pfad
  const data = await fileTypeFromBuffer(req.file.buffer);
  const path = DIR + v4() + "." + data.ext;

  // Speichert die Datei im Dateisystem
  await fs.writeFile(path, req.file.buffer);

  // Erstellt ein neues Boot-Objekt und fügt den Link zum Bild hinzu
  const boot = new Boot(req.body);
  boot.imgLink = "https://boat-rent.onrender.com/" + path;

  // Versucht, das Boot in der Datenbank zu speichern und sendet eine Antwort
  try {
    await boot.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

// Ruft alle Boote aus der Datenbank ab
export const getBoote = async (req, res) => {
  const boote = await Boot.find();
  res.json(boote).end();
};

// Löscht ein spezifisches Boot aus der Datenbank
export const delBoot = async (req, res) => {
  const response = await Boot.deleteOne({ _id: req.body.id });
  res.json(response).end();
};

// Fügt eine Reservierung zu einem bestimmten Boot hinzu
export const addResv = async (req, res) => {
  // Ruft Reservierungsdaten von einem externen Dienst ab
  const data = await fetch(
    "https://boat-rent.onrender.com/api/reservierung/get"
  ).then((res) => res.json());

  // Filtert Reservierungen für das spezifizierte Boot
  const reservierung = data.filter((resv) => resv.Boot == req.body.Boot);

  // Aktualisiert das Boot-Objekt in der Datenbank mit der neuen Reservierung
  const response = await Boot.updateOne(
    { _id: req.body.Boot },
    { $addToSet: { Reservierung: reservierung } }
  );
  res.json(response).end();
};

// Ruft Boote ab, die im angegebenen Zeitraum verfügbar sind
export const getAviableBoote = async (req, res) => {
  try {
    // Parst die Datumswerte aus der Anfrage
    const startDatum = new Date(req.body.start);
    const endDatum = new Date(req.body.end);

    // Führt eine Abfrage aus, um Boote zu finden, die im angegebenen Zeitraum verfügbar sind
    const Boote = await Boot.find({
      Reservierung: {
        $not: {
          $elemMatch: {
            $or: [
              {
                Startdatum: { $lte: endDatum },
                Enddatum: { $gte: startDatum },
              },
              {
                Startdatum: { $gte: startDatum, $lte: endDatum },
              },
              {
                Enddatum: { $gte: startDatum, $lte: endDatum },
              },
            ],
          },
        },
      },
    });

    res.json(Boote).end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Serverfehler");
  }
};
