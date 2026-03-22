# Candor Waitlist API ✨

## Overview
This is a robust backend API for Candor, built with TypeScript, Node.js, and the Express framework. It efficiently manages user waitlist registrations and automates email notifications, leveraging TypeORM for seamless PostgreSQL database interactions.

## Features
-   **TypeScript**: Enhances code quality and maintainability with strong typing.
-   **Node.js & Express**: Provides a fast, scalable, and unopinionated framework for building web APIs.
-   **TypeORM**: An advanced ORM supporting multiple databases (primarily PostgreSQL here) with powerful entity management features.
-   **PostgreSQL**: A reliable, open-source object-relational database system for persistent data storage.
-   **Zod**: Ensures robust data integrity through schema validation for incoming request payloads.
-   **Pino**: A highly performant logger for Node.js, delivering detailed application and HTTP request logging.
-   **Nodemailer**: Facilitates reliable email delivery for user confirmations and internal admin notifications.
-   **Helmet**: Secures the API by setting various HTTP response headers against common vulnerabilities.
-   **Express Rate Limit**: Implements effective rate limiting to protect against brute-force attacks and abuse.
-   **Global Error Handling**: Centralized and consistent error management for a predictable API experience.
-   **Database Connection Resilience**: Includes retry logic for database connection, improving application robustness against transient network issues.

## Getting Started
### Installation
To get this project running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/obed-smart/Candor.git
    cd Candor
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory of the project and populate it with the required variables as detailed in the "Environment Variables" section below.

### Environment Variables
All essential environment variables are listed below with example values. Create a file named `.env` in the project root.

-   `PORT=3000` (The port number on which the Express server will listen)
-   `NODE_ENV=development` (The application's operating environment: `development`, `production`, or `test`)
-   `DATABASE_URL="postgres://user:password@host:port/candor_waitlist_db"` (The full connection string for your PostgreSQL database)
-   `EMAIL_HOST="smtp.mailtrap.io"` (The SMTP host for sending emails, e.g., a Mailtrap host for development)
-   `EMAIL_PORT=2525` (The SMTP port for email transmission)
-   `EMAIL_USER="your_mailtrap_username"` (The username for authenticating with your SMTP server)
-   `EMAIL_PASS="your_mailtrap_password"` (The password for authenticating with your SMTP server)
-   `ADMIN_EMAIL="admin@example.com"` (The email address designated for receiving internal admin notifications)

## Usage
After successfully installing the dependencies and configuring your environment variables, you can start the server in different modes:

### Development Mode
To run the server with hot-reloading for development:
```bash
npm run dev
```

### Production Mode
To build and run the server for a production environment:
```bash
npm run build
npm start
```

The API will then be accessible at the base URL specified in the API Documentation section.

## API Documentation
### Base URL
`http://localhost:3000/api/v1` (for local development)

### Endpoints

#### POST /waitlist
Adds a new user's email to the waitlist.
**Request**:
```json
{
  "email": "user@example.com",
  "userName": "OptionalUsername",
  "middleName": "OptionalMiddleName"
}
```
*   `email`: string, required, must be a valid email format.
*   `userName`: string, optional.
*   `middleName`: string, optional.
    *   *Note*: Due to current validation rules, `userName` and `middleName` fields should be omitted or provided as empty strings/whitespace. Submitting non-empty values for these fields will currently result in a validation error.

**Response**:
```json
{
  "success": true,
  "message": "Joined waitlist successfully",
  "data": null
}
```

**Errors**:
-   `400 Bad Request`: Occurs when the provided `email` is invalid, missing, or if `userName` or `middleName` contain non-whitespace characters as per current validation logic.
    ```json
    {
      "success": false,
      "message": "Please provide a valid email address",
      "data": null,
      "code": 400
    }
    ```
-   `429 Too Many Requests`: Triggered when an IP address exceeds the allowed rate limit for waitlist entries.
    ```json
    {
      "success": false,
      "message": "Too many requests, please try again later.",
      "data": null,
      "code": 429
    }
    ```
-   `500 Internal Server Error`: An unexpected server-side issue occurred (e.g., database error, email service failure).
    ```json
    {
      "success": false,
      "message": "Something went wrong",
      "data": null,
      "code": 500
    }
    ```

#### GET /waitlist
Retrieves a list of all current entries in the waitlist.
**Request**:
(No request body or parameters required)

**Response**:
```json
{
  "success": true,
  "message": "Waitlist fetched",
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "email": "user1@example.com",
      "createdAt": "2023-10-26T10:00:00.000Z"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
      "email": "user2@example.com",
      "createdAt": "2023-10-26T10:05:00.000Z"
    }
  ]
}
```

**Errors**:
-   `500 Internal Server Error`: An unexpected server-side issue occurred (e.g., database query failure).
    ```json
    {
      "success": false,
      "message": "Something went wrong",
      "data": null,
      "code": 500
    }
    ```

#### GET /waitlist/count
Returns the total number of unique entries currently in the waitlist.
**Request**:
(No request body or parameters required)

**Response**:
```json
{
  "success": true,
  "message": "waitlist count return successfully",
  "data": 2
}
```

**Errors**:
-   `500 Internal Server Error`: An unexpected server-side issue occurred (e.g., database count operation failure).
    ```json
    {
      "success": false,
      "message": "Something went wrong",
      "data": null,
      "code": 500
    }
    ```

#### GET /health
A simple endpoint to check if the API is running and responsive.
**Request**:
(No request body or parameters required)

**Response**:
```json
{
  "success": true,
  "message": "Api is running",
  "data": null
}
```

**Errors**:
-   `500 Internal Server Error`: Indicates a problem with the server itself, preventing it from responding to basic requests.
    ```json
    {
      "success": false,
      "message": "Something went wrong",
      "data": null,
      "code": 500
    }
    ```

## Technologies Used

| Technology         | Description                                                      | Link                                                       |
| :----------------- | :--------------------------------------------------------------- | :--------------------------------------------------------- |
| **TypeScript**     | Strongly typed superset of JavaScript.                           | [TypeScript](https://www.typescriptlang.org/)              |
| **Node.js**        | JavaScript runtime built on Chrome's V8 engine.                  | [Node.js](https://nodejs.org/en)                           |
| **Express.js**     | Fast, unopinionated, minimalist web framework for Node.js.       | [Express.js](https://expressjs.com/)                       |
| **TypeORM**        | ORM for TypeScript and JavaScript (ES7, ES6, ES5).               | [TypeORM](https://typeorm.io/)                             |
| **PostgreSQL**     | Powerful open-source object-relational database system.          | [PostgreSQL](https://www.postgresql.org/)                  |
| **Zod**            | TypeScript-first schema declaration and validation library.      | [Zod](https://zod.dev/)                                    |
| **Pino**           | Extremely fast, low overhead logger for Node.js.                 | [Pino](https://getpino.io/)                                |
| **Nodemailer**     | Module for sending emails with Node.js.                          | [Nodemailer](https://nodemailer.com/about/)                |
| **Helmet**         | Security middleware for Express apps.                            | [Helmet](https://helmetjs.github.io/)                      |
| **Express Rate Limit** | Basic rate-limiting middleware for Express.                    | [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) |
| **Dotenv**         | Loads environment variables from a `.env` file.                  | [Dotenv](https://www.npmjs.com/package/dotenv)             |
| **Cookie-parser**  | Parse Cookie header and populate `req.cookies`.                  | [Cookie-parser](https://www.npmjs.com/package/cookie-parser) |
| **html-to-text**   | Converts HTML into plain text.                                   | [html-to-text](https://www.npmjs.com/package/html-to-text) |
| **Nanoid**         | Tiny, secure, URL-friendly, unique string ID generator.          | [Nanoid](https://www.npmjs.com/package/nanoid)             |
| **Tsx**            | TypeScript execution environment for Node.js.                    | [Tsx](https://github.com/esbuild-kit/tsx)                  |



## License
This project is released under the ISC License. For full details, please refer to the `package.json` file in the repository.

---

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FA2069?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Pino](https://img.shields.io/badge/Pino-FF0000?style=for-the-badge&logo=pino&logoColor=white)](https://getpino.io/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-40B340?style=for-the-badge&logo=nodemailer&logoColor=white)](https://nodemailer.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)