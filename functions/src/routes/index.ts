import express, {Router} from "express";
import protectedRoutes from "./protectedRoutes";
import authJWT from "../middlewares/auth";
import employee from "./employeeRoutes";

const router = express.Router();

export default (): Router => {
  employee(router);

  const protectedRouter = express.Router();
  protectedRoutes(protectedRouter);
  router.use("/protected", authJWT, protectedRouter);

  return router;
};
