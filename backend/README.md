---
# University Course Aggregator API

This is the backend server for the University Course Aggregator MiniPortal. It's a RESTful API built with Node.js, Express, and TypeScript. It provides endpoints to fetch, create, and manage university course data, complete with search, filtering, and pagination capabilities.
---

## Features

- **RESTful API**: Clean, predictable, and resource-oriented endpoints.
- **TypeScript**: Ensures type safety and improves code quality and maintainability.
- **Search & Filter**: Dynamically search courses by title and filter by university.
- **Pagination**: Efficiently loads data in pages to handle large datasets.
- **CRUD Operations**: Full support for Creating, Reading, Updating, and Deleting (CRUD) courses for administrative purposes.
- **Mock Data**: Utilizes an in-memory JSON array, making it easy to set up and test without a database.

---

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher is recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/timfemey/jmce-assignment.git
    ```

2.  **Navigate to the backend directory:**

    ```bash
    cd jmce-assignment/backend
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

4.  **Build the development backend:**

    ```bash
    npm run build
    ```

5.  **Run the server:**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:5000`.

### Available Scripts

- `npm run build`: Compiles the TypeScript code into JavaScript in the `dist/` directory.
- `npm start`: Starts the compiled application from the `dist/` directory.

---

## API Documentation

### `GET /courses`

Fetches a paginated and filterable list of all courses.

#### Query Parameters

| Parameter    | Type   | Description                                                  | Default |
| :----------- | :----- | :----------------------------------------------------------- | :------ |
| `search`     | String | A search term to filter courses by title (case-insensitive). | `""`    |
| `university` | String | The exact name of a university to filter by.                 | `null`  |
| `page`       | Number | The page number for pagination.                              | `1`     |
| `limit`      | Number | The number of items to return per page.                      | `10`    |

#### Success Response (200 OK)

```json
{
  "totalPages": 2,
  "currentPage": 1,
  "courses": [
    {
       "id": 1,
  "title": "Software Engineering",
  "university": "University of Lagos",
  "duration": "4 Years",
  "location": "Lagos",
  "fees": 80000,
      "description": "...",
      "entryRequirements": [...],
      "modules": [...]
    }
  ]
}
```

### \---

### `GET /courses/:id`

Fetches details for a single course by its ID.

#### URL Parameters

| Parameter | Type   | Description                                        |
| :-------- | :----- | :------------------------------------------------- |
| `id`      | Number | **Required**. The unique identifier of the course. |

#### Success Response (200 OK)

```json
{
  "id": 1,
  "title": "Software Engineering",
  "university": "University of Lagos",
  "duration": "4 Years",
  "location": "Lagos",
  "fees": 80000,
  "description": "A comprehensive program covering algorithms, AI, and systems.",
  "entryRequirements": ["High School Diploma", "SAT/ACT Scores", "Essay"],
  "modules": [
    "Intro to CS",
    "Data Structures",
    "Machine Learning",
    "Web Development"
  ]
}
```

#### Error Response (404 Not Found)

```json
{
  "message": "Course not found"
}
```

### \---

### `POST /courses`

Creates a new course. (Used for the admin panel).

#### Request Body

The request body must be a JSON object with the course details. The `id` is generated automatically.

```json
{
  "title": "Data Science",
  "university": "MIT",
  "duration": "2 Years",
  "location": "Cambridge, MA",
  "fees": 60000,
  "description": "A master's program focusing on statistical modeling and data analysis.",
  "entryRequirements": ["Bachelor's Degree in a related field"],
  "modules": ["Advanced Statistics", "Big Data Technologies", "Deep Learning"]
}
```

#### Success Response (201 Created)

Returns the newly created course object with its assigned `id`.

### \---

### `PUT /courses/:id`

Updates an existing course by its ID. (Used for the admin panel).

#### URL Parameters

| Parameter | Type   | Description                                        |
| :-------- | :----- | :------------------------------------------------- |
| `id`      | Number | **Required**. The unique identifier of the course. |

#### Request Body

A JSON object containing the fields to be updated. You can send a partial object.

```json
{
  "fees": 58000,
  "duration": "4.5 Years"
}
```

#### Success Response (200 OK)

Returns the full, updated course object.

#### Error Response (404 Not Found)

```json
{
  "message": "Course not found"
}
```

---

## 📁 Project Structure

The server codebase is organized as follows:

```
backend/
└── src/
    ├── data/           # Contains mock data sources.
    ├── routes/         # Defines the API routes.
    ├── controllers/    # Contains the business logic for each route.
    ├── types/          # Holds shared TypeScript type definitions.
    └── main.ts       # The main entry point for the Express server.
```
