import mongoose from "mongoose";

const resvSchema = new mongoose.Schema({
  Startdatum: { type: Date },
  Enddatum: { type: Date },
  Boot: { type: String },
});

export const Reservierung = mongoose.model("Reservierungen", resvSchema);
