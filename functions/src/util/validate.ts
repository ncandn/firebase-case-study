import { Result } from "../models/response";

function emailRegex(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return re.test(email);
}

export function validateBody(body: any): Result {
  let result: Result = {
    success: true
  };

  for (let i in body) {
    if (!body[i]) {
      result.success = false;
      result.message = result.message ? result.message + `Field: '${i}' cannot be empty. ` : `Field '${i}' cannot be empty. `;
    }

    if (typeof body[i] === "string" && body[i].length > 50) {
      result.success = false;
      result.message = result.message ? result.message + `Field: '${i}' cannot be longer than 50 characters. ` : `Field '${i}' cannot be longer than 50 characters. `;
    }

    if (i === "email" && !emailRegex(body[i])) {
      result.success = false;
      result.message = result.message ? result.message + `Field: '${i}' invalid format. ` : `Field '${i}' invalid format. `;
    }
  }

  return result;
}
