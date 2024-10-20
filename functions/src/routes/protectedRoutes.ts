import {Router} from "express";
import {CreateEmployee, GetEmployeeByID, GetAllEmployees, UpdateEmployee, DeleteEmployee} from "../controllers/employeeController";

export default (router: Router) => {
  router.post("/employee", CreateEmployee);
  router.get("/employee", GetAllEmployees);
  router.get("/employee/:id", GetEmployeeByID);
  router.patch("/employee/:id", UpdateEmployee);
  router.delete("/employee/:id", DeleteEmployee);
};
