import { EmployeeRepository } from '../repositories/employeeRepository';
import { validateBody } from "../util/validate";
import { Employee } from '../models/employee';
import { Result } from '../models/response';
import { db } from '../config/firebase';

const employeeRepository = new EmployeeRepository();

export class EmployeeService {
  async createEmployee(body: any): Promise<Result> {
    const validateResult = validateBody(body);
    if (!validateResult.success) {
      return validateResult;
    }

    const managerRef = db.collection("employees").doc(body.manager.id);
    const employeeData: Employee = {
      name: body.name,
      email: body.email,
      team: body.team,
      company: body.company,
      manager: managerRef
    }

    await employeeRepository.createEmployee(employeeData);

    return {
      success: true,
      message: `Employee record of ${body.name} is created successfully.`
    }
  }
}
