# Employee Management System API

This project is a RESTful API for managing employees, deployed to **Firebase Functions** and built using **Node.js**, **Express**, and **TypeScript**. It features a backend server for employee data management and implements secure access, efficient database querying, and automated CI/CD workflows.

## Deployment

The project is deployed using **Firebase Functions**, allowing for scalable, serverless deployment. It is implemented using **Node.js**, **Express.js**, and **TypeScript**, providing a strong, type-safe foundation for API development.

- **Firebase Functions**: Handles serverless backend deployment.
- **Node.js + Express.js**: Provides routing and request handling for API endpoints.
- **TypeScript**: Ensures type safety, better development experience, and fewer runtime errors.

![Firebase Functions](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/Firebase_Functions.png?raw=true)

## Database

The project uses **Firestore**, a NoSQL database from Firebase, as the primary data store. We have optimized database queries by adding **indexes** for composite queries and **scheduled backups** to ensure data resilience.

### Key Database Features:

- **Indexes**: Created to optimize performance, particularly for queries that filter or sort by fields such as `team`, `company`, `manager`, and `name`.
  ![Firestore Indexes](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/Firestore_Indexes.png?raw=true)

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

![Github Actions](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/Github_Actions.png?raw=true)

The project uses **GitHub Actions** to automate continuous integration and deployment (CI/CD). The workflow is configured to:

- Automatically **deploy to Firebase** whenever changes are pushed to the `main` branch.
- Mock deployments to STG and DEV instances (if exists).
- Run tests and check for linting issues before deployment.
- Environment variables and sensitive information are managed securely via GitHub Secrets.
  ![Github Secrets](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/Github_Secrets.png?raw=true)

### CI/CD Workflows:

- **`firebase-hosting-pull-request`**: A mockup GitHub Actions job that is triggered when a Pull Request is opened. Ideally, in this workflow, we run a code review tool, AI tool, Linter, and anything that comes to mind that has to be done in a pre-deploy stage.

  This workflow right now only builds the code and run Lint command for now.

- **`firebase-hosting-merge`**: This workflow triggers whenever there's a merge (manual or via PR merge), and only targets `develop`, `staging`, and `main` branches. The job itself:
  - Builds the code,
  - Runs Lint,
  - Installs all dependencies,
  - Deploys to Firebase Hosting,
  - Creates a `.env` file and populates from GitHub Secrets (in order to prevent keeping a `.env` file in the repository itself, for security purposes),
  - Finally, deploys to Firebase Functions.

![Firebase Hosting](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/Hosting_CI.png?raw=true)

## API Documentation

### Base URL:

- **URL**: `https://app-zzic6knv4q-uc.a.run.app`

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

## Extra Features

### Scheduled Backup:

Added scheduled backup via Google Cloud. Using the following configuration command, the system now has a Disaster Recovery:

```
firebase firestore:backups:schedules:create --database '(default)' --recurrence 'WEEKLY' --retention '14w' --day-of-week 'SATURDAY'
```

![Scheduled Backup](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/ScheduledBackup.png?raw=true)

### Protected Routes:

By utilizing API Access Tokens, all of the endpoints have protected alternatives, for testing purposes. Using JWT, a user retrieves an Auth Token which is valid for 24 hours, to gain access to these protected endpoints.

See [Authentication](#authentication) for more information.

### Rate Limiter:

In order to limit access and prevent multiple unwanted requests from the same IP, a rate limiter is introduced. By default, in a 15 minutes time window, only up to 500 requests are allowed from the same IP.

![Rate Limiter](https://github.com/ncandn/firebase-case-study/blob/main/docs/images/Rate_Limiter.png?raw=true)
