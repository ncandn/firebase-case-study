export interface Employee {
  name: string;
  email: string;
  team: string;
  company: string;
  id?: string;
  manager?: FirebaseFirestore.DocumentReference | string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}
