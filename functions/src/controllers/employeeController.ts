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
    })
  }

  return next();
};

export const GetEmployeeByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await employeeService.createEmployee(req.body);

    res.status(result.success ? 201 : 500).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to create employee; ${err}`
    })
  }

  return next();
};
