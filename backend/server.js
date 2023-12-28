import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { router as bootRouter } from "./boote/router.js";
import { router as resvRouter } from "./reservierungen/router.js";
//import { router as userRouter } from "./user/router.js";
import { setup } from "./utils/storageHandler.js";

const server = express();

setup();
server.use(cors());
server.use(express.json());
server.use("/uploads", express.static("uploads"));
await mongoose.connect(process.env.DBCONNECTION);

server.use("/api/boot", bootRouter);
server.use("/api/reservierung", resvRouter);
//server.use("/api/user", userRouter);

server.listen(process.env.PORT, () =>
  console.log(`Teleportiert sich mit ${process.env.PORT} Sachen`)
);
