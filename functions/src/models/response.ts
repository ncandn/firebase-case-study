import {Employee} from "./employee";

export interface Result {
  success: boolean;
  message?: string;
}

export interface EmployeeResult extends Result {
  response: Employee | Employee[] | null;
}
