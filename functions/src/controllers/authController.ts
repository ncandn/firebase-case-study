import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "MOCKJWTSECRET";

export const GenerateAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = jwt.sign({ id: "MOCKID", username: "MOCKUSER" }, JWT_SECRET, { expiresIn: "24h" });

  res.status(200).json({
    accessToken: token
  });

  return next();
};
