import { Boot } from "./model.js";
import { fileTypeFromBuffer } from "file-type";
import { v4 } from "uuid";
import fs from "fs/promises";

const DIR = "./uploads/";

export const addBoot = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const data = await fileTypeFromBuffer(req.file.buffer);
  const path = DIR + v4() + "." + data.ext;

  await fs.writeFile(path, req.file.buffer);

  const boot = new Boot(req.body);
  boot.imgLink = "https://boat-rent.onrender.com/" + path;
  try {
    await boot.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
export const getBoote = async (req, res) => {
  const boote = await Boot.find();
  res.json(boote).end();
};
export const delBoot = async (req, res) => {
  const response = await Boot.deleteOne({ _id: req.body.id });
  res.json(response).end();
};

export const addResv = async (req, res) => {
  const data = await fetch(
    "https://boat-rent.onrender.com/api/reservierung/get"
  ).then((res) => res.json());

  const reservierung = data.filter((resv) => resv.Boot == req.body.Boot);

  const response = await Boot.updateOne(
    { _id: req.body.Boot },
    { $addToSet: { Reservierung: reservierung } }
  );
  res.json(response).end();
};

export const getAviableBoote = async (req, res) => {
  try {
    const startDatum = new Date(req.body.start);
    const endDatum = new Date(req.body.end);

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
