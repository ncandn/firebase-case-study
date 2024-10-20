import { EmployeeRepository } from '../repositories/employeeRepository';
import { validateBody } from "../util/validate";
import { Employee } from '../models/employee';
import { Result, EmployeeResult } from '../models/response';

const employeeRepository = new EmployeeRepository();

export class EmployeeService {
  async createEmployee(body: any): Promise<Result> {
    const validateResult = validateBody(body);
    if (!validateResult.success) {
      return validateResult;
    }

    const employeeData: Employee = {
      name: body.name,
      email: body.email,
      team: body.team,
      company: body.company,
      manager: body.manager
    }

    await employeeRepository.createEmployee(employeeData);

    return {
      success: true,
      message: `Employee record for ${body.name} is created successfully.`
    };
  }

  async getEmployeeByID(id: string): Promise<EmployeeResult> {
    const employee = await employeeRepository.getEmployeeByID(id);

    return {
      success: true,
      response: employee,
      message: `Employee record of id "${id}" is fetched successfully.`
    };
  }

  async getAllEmployees(): Promise<EmployeeResult> {
    const employees = await employeeRepository.getAllEmployees();

    return {
      success: true,
      response: employees,
      message: `All employee records are fetched successfully.`
    }
  }

  async deleteEmployee(id: string): Promise<Result> {
    await employeeRepository.deleteEmployee(id);

    return {
      success: true,
      message: `Employee record of id "${id}" is deleted successfully.`
    }
  }
}
