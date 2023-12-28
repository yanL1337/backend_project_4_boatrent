import { Reservierung } from "./model.js";

export const addResv = async (req, res) => {
  const reservierung = new Reservierung(req.body);
  console.log(req.body);
  try {
    await reservierung.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
export const getResv = async (req, res) => {
  const Reservierungen = await Reservierung.find();
  res.json(Reservierungen).end();
};

export const delResv = async (req, res) => {
  const response = await Reservierung.deleteOne({ _id: req.body.id });
  res.json(response).end();
};
