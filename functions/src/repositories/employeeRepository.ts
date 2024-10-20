import { db, firestore } from '../config/firebase';
import { Employee } from '../models/employee';

const employeeCollection = db.collection('employees');

export class EmployeeRepository {
  async createEmployee(employeeData: Employee): Promise<void> {
    if (employeeData.manager && typeof employeeData.manager === "string") {
      const managerRef = employeeCollection.doc(employeeData.manager);
      employeeData.manager = managerRef;
    }

    employeeData.createdAt = firestore.Timestamp.fromDate(new Date());
    employeeData.updatedAt = firestore.Timestamp.fromDate(new Date());

    const employeeRef = employeeCollection.doc();
    await employeeRef.create(employeeData);
  }

  async getEmployeeByID(id: string): Promise<Employee | null> {
    const doc = await employeeCollection.doc(id).get();
    return doc.exists ? (doc.data() as Employee) : null;
  }

  async getAllEmployees(): Promise<Employee [] | null> {
    const snapshot = await employeeCollection.get();
    return snapshot.docs.map(doc => doc.data() as Employee);
  }

  async deleteEmployee(id: string): Promise<void> {
    const employeeRef = employeeCollection.doc(id);
    await employeeRef.delete();
  }
}
