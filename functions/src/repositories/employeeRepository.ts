import { db } from '../config/firebase';
import { Employee } from '../models/employee';

const employeeCollection = db.collection('employees');

export class EmployeeRepository {
  async createEmployee(employeeData: Employee): Promise<void> {
    const employeeRef = employeeCollection.doc();
    await employeeRef.create(employeeData);
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    const doc = await employeeCollection.doc(id).get();
    return doc.exists ? (doc.data() as Employee) : null;
  }

  async getAllEmployees(): Promise<Employee [] | null> {
    const docs = await employeeCollection.doc().get();
    return docs.exists ? (docs.data() as Employee[]) : null;
  }
}
