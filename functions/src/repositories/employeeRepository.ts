import {db, firestore} from "../config/firebase";
import {buildQuery} from "../util/buildQuery";
import {Employee} from "../models/employee";

const employeeCollection = db.collection("employees");

/**
 * Repository for handling employee data in Firestore.
 * Provides methods for CRUD operations on the "employees" collection.
 */
export class EmployeeRepository {
  /**
   * Checks if an employee exists by ID or email.
   * @param {string | null} id - The ID of the employee.
   * @param {string | null} email - The email of the employee.
   * @return {Promise<boolean>} - A promise that resolves to true if the employee exists, otherwise false.
   */
  async checkIfEmployeeExists(id: string | null, email: string | null): Promise<boolean> {
    if (id) {
      const employeeRef = await employeeCollection.doc(id);
      const employeeDoc = await employeeRef.get();
      return employeeDoc.exists;
    } else if (email) {
      return !(await employeeCollection.where("email", "==", email).get()).empty;
    }

    return false;
  }

  /**
   * Creates a new employee in the Firestore database.
   * @param {Employee} employeeData - The employee data to create.
   * @return {Promise<Employee | null>} - A promise that resolves to the created employee object or null if creation fails.
   */
  async createEmployee(employeeData: Employee): Promise<Employee | null> {
    if (employeeData.manager) {
      const managerRef = employeeCollection.doc(employeeData.manager.toString());
      employeeData.manager = managerRef;
    }

    const employeeRef = employeeCollection.doc();
    await employeeRef.create({
      ...employeeData,
      createdAt: firestore.Timestamp.fromDate(new Date()),
      updatedAt: firestore.Timestamp.fromDate(new Date()),
    });

    return {...(await employeeRef.get()).data(), id: employeeRef.id} as Employee;
  }

  /**
   * Retrieves an employee by their ID.
   * @param {string} id - The ID of the employee.
   * @return {Promise<Employee | null>} - A promise that resolves to the employee object if found, otherwise null.
   */
  async getEmployeeByID(id: string): Promise<Employee | null> {
    const doc = await employeeCollection.doc(id).get();
    return doc.exists ? ({...doc.data(), id: doc.id} as Employee) : null;
  }

  /**
   * Retrieves all employees, with optional query filtering.
   * @param {any | null} query - Optional query parameters for filtering employees.
   * @return {Promise<Employee[]>} - A promise that resolves to an array of employee objects.
   */
  async getAllEmployees(query: any | null): Promise<Employee [] | null> {
    const snapshot = query ? await (await buildQuery(employeeCollection, query)).get() : await employeeCollection.get();
    return snapshot.docs.map((doc) => ({...doc.data(), id: doc.id} as Employee));
  }

  /**
   * Updates an employee's data.
   * @param {string} id - The ID of the employee to update.
   * @param {Partial<Employee>} updateData - The partial employee data to update.
   * @return {Promise<Employee | null>} - A promise that resolves to the updated employee object or null if not found.
   */
  async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee | null> {
    const employeeRef = employeeCollection.doc(id);
    const doc = await employeeRef.get();

    if (doc.exists) {
      await employeeRef.update({
        ...updateData,
        updatedAt: firestore.Timestamp.fromDate(new Date()),
      });

      return {...doc.data(), id: doc.id} as Employee;
    }

    return null;
  }

  /**
   * Deletes an employee by their ID.
   * @param {string} id - The ID of the employee to delete.
   * @return {Promise<void>} - A promise that resolves when the employee is deleted.
   */
  async deleteEmployee(id: string): Promise<void> {
    const employeeRef = employeeCollection.doc(id);
    await employeeRef.delete();
  }
}
