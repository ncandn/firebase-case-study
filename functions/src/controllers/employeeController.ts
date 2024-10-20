import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employeeService";

const employeeService = new EmployeeService();

export const CreateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.createEmployee(req.body);

    res.status(result.success ? 201 : 500).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to create employee; ${err}`
    });
  }

  return next();
};

export const GetEmployeeByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.getEmployeeByID(req.params["id"]);

    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to get employee; ${err}`
    });
  }

  return next();
};

export const GetAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.getAllEmployees(req.query);

    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to get all employees; ${err}`
    });
  }

  return next();
};

export const UpdateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.updateEmployee(req.params["id"], req.body);

    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to get employee; ${err}`
    });
  }

  return next();
};

export const DeleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.deleteEmployee(req.params["id"]);

    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to delete employee; ${err}`
    });
  }

  return next();
};
