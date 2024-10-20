import { db, firestore } from '../config/firebase';
import { buildQuery } from '../util/buildQuery';
import { Employee } from '../models/employee';

const employeeCollection = db.collection('employees');

export class EmployeeRepository {
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

  async createEmployee(employeeData: Employee): Promise<Employee | null> {
    if (employeeData.manager) {
      const managerRef = employeeCollection.doc(employeeData.manager.toString());
      employeeData.manager = managerRef;
    }

    const employeeRef = employeeCollection.doc();
    await employeeRef.create({
      ...employeeData,
      createdAt: firestore.Timestamp.fromDate(new Date()),
      updatedAt: firestore.Timestamp.fromDate(new Date())
    });

    return (await employeeRef.get()).data() as Employee;
  }

  async getEmployeeByID(id: string): Promise<Employee | null> {
    const doc = await employeeCollection.doc(id).get();
    return doc.exists ? (doc.data() as Employee) : null;
  }

  async getAllEmployees(query: any | null): Promise<Employee [] | null> {
    const snapshot = query ? await (await buildQuery(employeeCollection, query)).get() : await employeeCollection.get();
    return snapshot.docs.map(doc => doc.data() as Employee);
  }

  async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee | null> {
    const employeeRef = employeeCollection.doc(id);
    const doc = await employeeRef.get();

    if (doc.exists) {
      await employeeRef.update({
        ...updateData,
        updatedAt: firestore.Timestamp.fromDate(new Date())
      });

      return doc.data() as Employee;
    }

    return null;
  }

  async deleteEmployee(id: string): Promise<void> {
    const employeeRef = employeeCollection.doc(id);
    await employeeRef.delete();
  }
}
