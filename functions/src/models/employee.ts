export interface Employee {
  name: string;
  email: string;
  team: string;
  company: string;
  manager?: FirebaseFirestore.DocumentReference;
}
