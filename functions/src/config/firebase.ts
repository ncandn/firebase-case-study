import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const { privateKey } = JSON.parse(process.env.PRIVATE_KEY || "");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey,
  }),
});

const firestore = admin.firestore;
const db = admin.firestore();
export {db, firestore};
