import {Result} from "../models/response";

/**
 * Validates whether the provided email string is in a valid email format.
 * @param {string} email - The email string to validate.
 * @return {boolean} - Returns true if the email format is valid, otherwise false.
 */
function emailRegex(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return re.test(email);
}

/**
 * Validates the request body to ensure all fields meet validation criteria.
 * @param {any} body - The request body containing fields to validate.
 * @return {Result} - An object indicating success or failure, with a message if validation fails.
 */
export function validateBody(body: any): Result {
  const result: Result = {
    success: true,
  };

  for (const i in body) {
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
