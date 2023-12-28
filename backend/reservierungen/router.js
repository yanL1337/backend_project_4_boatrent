import express from "express";
import { addResv, delResv, getResv } from "./controller.js";
import multer from "multer";

export const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/add", upload.none(), addResv);
router.get("/get", getResv);

router.delete("/delete", delResv);
