import mongoose from "mongoose";

const booteSchema = new mongoose.Schema({
  Baujahr: { type: Number },
  Seriennummer: { type: Number },
  Material: { type: String },
  Bootsart: { type: String },
  imgLink: { type: String },
  Reservierung: [{ Startdatum: Date, Enddatum: Date, Boot: String }],
});

export const Boot = mongoose.model("Boote", booteSchema);
