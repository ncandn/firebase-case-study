import { EmployeeRepository } from '../repositories/employeeRepository';
import { validateBody } from "../util/validate";
import { Employee } from '../models/employee';
import { Result, EmployeeResult } from '../models/response';

const employeeRepository = new EmployeeRepository();

export class EmployeeService {
  async createEmployee(body: any): Promise<EmployeeResult | Result> {
    const validateResult = validateBody(body);
    if (!validateResult.success) {
      return validateResult;
    }

    const employeeData: Employee = {
      name: body.name,
      email: body.email.toString().toLowerCase(),
      team: body.team,
      company: body.company,
      manager: body.manager
    }

    if (await employeeRepository.checkIfEmployeeExists(null, employeeData.email)) {
      return {
        success: false,
        message: `Employee record with the email of ${employeeData.email} already exists.`
      };
    }

    if (employeeData.manager && !(await employeeRepository.checkIfEmployeeExists(body.manager, null))) {
      return {
        success: false,
        message: `Couldn't find manager with the ID of ${employeeData.manager}.`
      };
    }

    const newEmployee = await employeeRepository.createEmployee(employeeData);

    return {
      success: true,
      response: newEmployee,
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

  async getAllEmployees(query: any | null): Promise<EmployeeResult> {
    const employees = await employeeRepository.getAllEmployees(query);

    return {
      success: true,
      response: employees,
      message: `All employee records are fetched successfully.`
    }
  }

  async updateEmployee(id: string, body: any): Promise<EmployeeResult | Result> {
    const validateResult = validateBody(body);
    if (!validateResult.success) {
      return validateResult;
    }

    const updateData = body as Partial<Employee>;
    const employee = await employeeRepository.updateEmployee(id, updateData);

    if (!employee) {
      return {
        success: true,
        message: `Employee record of id "${id}" could not be found.`
      };
    }

    return {
      success: true,
      response: employee,
      message: `Employee record of id "${id}" is updated successfully.`
    };
  }

  async deleteEmployee(id: string): Promise<Result> {
    await employeeRepository.deleteEmployee(id);

    return {
      success: true,
      message: `Employee record of id "${id}" is deleted successfully.`
    }
  }
}
