# Firebase Case Study

This is a RESTful API for managing employees, built using **Node.js**, **Express.js**, **TypeScript**, and **Firestore** (Firebase). It supports CRUD operations for employees and provides additional features such as access tokens for security, rate limiting, search and filtering, and automated backups.

## Features

### Key Requirements (Completed):

1.  **Deploy Firebase Cloud Functions**:

    - Firebase Cloud Functions project developed with Express is initialized and configured.
    - The API can be accessed through the following link: .

2.  **Use Firestore (NoSQL Database)**:

    - Firestore is used as the primary NoSQL database.
    - Fields are configured as intended, each corresponding with an appropriate type.
    - Employee relationships (e.g., manager details) are handled via references.
    - Added 2 extra fields: `createdAt: Timestamp, updatedAt: Timestamp`

| Field       | Type        |
| ----------- | ----------- |
| `name`      | `string`    |
| `email`     | `string`    |
| `team`      | `string`    |
| `company`   | `string`    |
| `manager`   | `reference` |
| `createdAt` | `Timestamp` |
| `updatedAt` | `Timestamp` |

3.  **CI/CD Workflow**:

    - Automated deployments using GitHub Actions.
    - Separate deployment workflows for development, staging, and production environments.

4.  **API Access Token**:

    - Implemented access token-based authentication to secure API endpoints.
    - Tokens are valid for 24 hours, ensuring only authorized users can access protected routes.

# Employee Management System API

This project is a RESTful API for managing employees, deployed to **Firebase Functions** and built using **Node.js**, **Express**, and **TypeScript**. It features a backend server for employee data management and implements secure access, efficient database querying, and automated CI/CD workflows.

## Deployment

The project is deployed using **Firebase Functions**, allowing for scalable, serverless deployment. It is implemented using **Node.js**, **Express.js**, and **TypeScript**, providing a strong, type-safe foundation for API development.

- **Firebase Functions**: Handles serverless backend deployment.
- **Node.js + Express.js**: Provides routing and request handling for API endpoints.
- **TypeScript**: Ensures type safety, better development experience, and fewer runtime errors.

## Database

The project uses **Firestore**, a NoSQL database from Firebase, as the primary data store. We have optimized database queries by adding **indexes** for composite queries and **scheduled backups** to ensure data resilience.

### Key Database Features:

- **Indexes**: Created to optimize performance, particularly for queries that filter or sort by fields such as `team`, `company`, `manager`, and `name`.
- **Scheduled Backups**: Regular backups are scheduled to Google Cloud Storage for data recovery and disaster management.
- **Fields**: The key fields stored for each employee include:
  | Field | Type |
  |-------------|-------------|
  | `name` | `string` |
  | `email` | `string` |
  | `team` | `string` |
  | `company` | `string` |
  | `manager` | `reference` |
  | `createdAt` | `Timestamp` |
  | `updatedAt` | `Timestamp` |

## Project Structure

The project follows a well-organized structure to maintain clarity and separation of concerns:

```
src/
├── config/        # Firebase and general app configuration
├── controllers/   # Handles HTTP requests and calls service methods
├── middlewares/   # Middleware functions for handling API access tokens, rate limiting, etc.
├── models/        # TypeScript interfaces and types for employee entities and API responses
├── repositories/  # Direct interaction with Firestore (e.g., CRUD operations)
├── routes/        # API route definitions, mapping paths to controllers
├── services/      # Business logic (e.g., employee creation, validation, etc.)
├── util/          # Utility functions (e.g., validation, query building)
```

## CI/CD

The project uses **GitHub Actions** to automate continuous integration and deployment (CI/CD). The workflow is configured to:

- Automatically **deploy to Firebase** whenever changes are pushed to the `main` branch.
- Mock deployments to STG and DEV instances (if exists).
- Run tests and check for linting issues before deployment.
- Environment variables and sensitive information are managed securely via GitHub Secrets.

### Key CI/CD Features:

- **Automated Deployment**: Upon every push to the `main` branch, the latest code is built and deployed to Firebase.
- **Continuous Integration**: The workflow runs tests and checks code quality before deployment to ensure reliability.

## API Documentation

### Base URL:

- **URL**: `<your-production-url>`

### Endpoints:

#### 1. **Get All Employees**

- **Endpoint**: `GET /api/employee`
- **Description**: Retrieves a list of all employees. Supports filtering and sorting by fields.
- **Query Parameters**:
  - `name` (optional): Filter employees by name.
  - `email` (optional): Filter employees by email.
  - `team` (optional): Filter employees by team.
  - `company` (optional): Filter employees by company.
  - `manager` (optional): Filter employees by manager ID.
  - `limit` (optional): Limit the number of returned employees (pagination).
- **Example**:

  `GET /api/employee?team=IT&manager=managerid123&limit=10`

#### 2. **Get Employee by ID**

- **Endpoint**: `GET /api/employee/:id`
- **Description**: Retrieves details of an employee by their ID.
- **Example**:

  `GET /api/employee/12345`

#### 3. **Create a New Employee**

- **Endpoint**: `POST /api/employee`
- **Description**: Creates a new employee record.
- **Request Body**:

  ```
  {
    "name": "Gordon Freeman",
    "email": "gfreeman@example.com",
    "team": "IT",
    "company": "Incompass Labs",
    "manager": "managerID123"
  }
  ```

- **Example**:

  `POST /api/employee`

#### 4. **Update an Employee**

- **Endpoint**: `PATCH /api/employee/:id`
- **Description**: Updates an employee's information.
- **Request Body**:

  ```
  {
    "team": "Product",
    "manager": "newManagerID"
  }
  ```

- **Example**:

  `PATCH /api/employee/12345`

#### 5. **Delete an Employee**

- **Endpoint**: `DELETE /api/employee/:id`
- **Description**: Deletes an employee from the system.
- **Example**:

  `DELETE /api/employee/12345`

### Authentication

These endpoints also have a protected alternatives. Protected routes require an **API Access Token** for authentication. You need to include the token in the `Authorization` header of your request:

`Authorization: Bearer <your-access-token>`

This Bearer Token can be retrieved from the following endpoint:

#### **Auth Token**

- **Endpoint**: `GET /api/auth`
- **Description**: Fetches an auth token to be used on protected routes.
- **Example**:

  `GET /api/auth`

Then the protected endpoints mentioned above can be accessed by placing protected in the route.

- **Example**:

  `GET /api/protected/employee/12345`
