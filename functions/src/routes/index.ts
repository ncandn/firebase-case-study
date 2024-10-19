import express, { Router } from "express";
import employee from "./employeeRoutes";

const router = express.Router();

export default (): Router => {
    employee(router);
    return router;
};
