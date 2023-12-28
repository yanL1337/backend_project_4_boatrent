import express from "express";
import {
  addBoot,
  delBoot,
  getBoote,
  addResv,
  getAviableBoote,
} from "./controller.js";
import multer from "multer";

export const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/add", upload.single("imgLink"), addBoot);
router.put("/addResv", upload.none(), addResv);
router.get("/get", getBoote);
router.delete("/delete", delBoot);
router.post("/getAviable", getAviableBoote);
