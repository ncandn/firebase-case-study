import {EmployeeRepository} from "../repositories/employeeRepository";
import {validateBody} from "../util/validate";
import {Employee} from "../models/employee";
import {Result, EmployeeResult} from "../models/response";

const employeeRepository = new EmployeeRepository();

/**
 * Service class for handling employee-related business logic.
 * Interfaces with the EmployeeRepository for CRUD operations.
 */
export class EmployeeService {
  /**
   * Creates a new employee after validating the request body.
   * @param {any} body - The request body containing employee data.
   * @return {Promise<EmployeeResult | Result>} - A promise that resolves to an object indicating success or failure, along with a message and the employee data if successful.
   */
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
      manager: body.manager,
    };

    if (await employeeRepository.checkIfEmployeeExists(null, employeeData.email)) {
      return {
        success: false,
        message: `Employee record with the email of ${employeeData.email} already exists.`,
      };
    }

    if (employeeData.manager && !(await employeeRepository.checkIfEmployeeExists(body.manager, null))) {
      return {
        success: false,
        message: `Couldn't find manager with the ID of ${employeeData.manager}.`,
      };
    }

    const newEmployee = await employeeRepository.createEmployee(employeeData);

    return {
      success: true,
      response: newEmployee,
      message: `Employee record for ${body.name} is created successfully.`,
    };
  }

  /**
   * Retrieves an employee by their ID.
   * @param {string} id - The ID of the employee to retrieve.
   * @return {Promise<EmployeeResult | Result>} - A promise that resolves to an object indicating success, with the employee data and a success message.
   */
  async getEmployeeByID(id: string): Promise<EmployeeResult | Result> {
    if (!(await employeeRepository.checkIfEmployeeExists(id, null))) {
      return {
        success: false,
        message: `Employee record with the ID of ${id} does not exist.`,
      };
    }

    const employee = await employeeRepository.getEmployeeByID(id);

    return {
      success: true,
      response: employee,
      message: `Employee record of id "${id}" is fetched successfully.`,
    };
  }

  /**
   * Retrieves all employees with optional query filtering.
   * @param {any | null} query - Optional query parameters for filtering employee results.
   * @return {Promise<EmployeeResult>} - A promise that resolves to an object indicating success, with a list of employee records and a success message.
   */
  async getAllEmployees(query: any | null): Promise<EmployeeResult> {
    const employees = await employeeRepository.getAllEmployees(query);

    return {
      success: true,
      response: employees,
      message: "All employee records are fetched successfully.",
    };
  }

  /**
   * Updates an employee record by ID.
   * @param {string} id - The ID of the employee to update.
   * @param {any} body - The request body containing updated employee data.
   * @return {Promise<EmployeeResult | Result>} - A promise that resolves to an object indicating success or failure, with the updated employee data or an error message.
   */
  async updateEmployee(id: string, body: any): Promise<EmployeeResult | Result> {
    if (!(await employeeRepository.checkIfEmployeeExists(id, null))) {
      return {
        success: false,
        message: `Employee record with the ID of ${id} does not exist.`,
      };
    }

    const validateResult = validateBody(body);
    if (!validateResult.success) {
      return validateResult;
    }

    const updateData = body as Partial<Employee>;
    const employee = await employeeRepository.updateEmployee(id, updateData);

    if (!employee) {
      return {
        success: true,
        message: `Employee record of id "${id}" could not be found.`,
      };
    }

    return {
      success: true,
      response: employee,
      message: `Employee record of id "${id}" is updated successfully.`,
    };
  }

  /**
   * Deletes an employee record by ID.
   * @param {string} id - The ID of the employee to delete.
   * @return {Promise<Result>} - A promise that resolves to an object indicating success, with a message confirming the deletion.
   */
  async deleteEmployee(id: string): Promise<Result> {
    if (!(await employeeRepository.checkIfEmployeeExists(id, null))) {
      return {
        success: false,
        message: `Employee record with the ID of ${id} does not exist.`,
      };
    }

    await employeeRepository.deleteEmployee(id);

    return {
      success: true,
      message: `Employee record of id "${id}" is deleted successfully.`,
    };
  }
}
