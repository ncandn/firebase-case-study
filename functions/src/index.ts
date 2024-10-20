import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import router from "./routes";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({origin: true}));
app.use("/api", router());

app.get("/", async (req, res) => {
  logger.info("Hello logs!", {structuredData: true});
  res.send("Hello from Firebase!");
});

// Export Express to Firebase
exports.app = onRequest(app);
