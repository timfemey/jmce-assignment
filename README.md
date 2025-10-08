# University Course Aggregator: Project Approach

This document outlines the architectural approach behind the development of the University Course Aggregator MiniPortal full-stack web application.

---

### ## Decoupled Full-Stack Architecture

The project was built using a **decoupled, client-server architecture**. This was a fundamental decision that separates the application into two distinct parts:

1.  **Backend (API Server):** A RESTful API built with **Node.js and Express**. Its sole responsibility is to manage data and business logic. It exposes a set of predictable endpoints for creating, reading, updating and deleting course information.
2.  **Frontend (Client):** A dynamic single-page application (SPA) built with **React**. It is responsible for all user interface rendering and interaction. It consumes the data provided by the backend API but has no direct access to the data source itself.

This separation allows for independent development, testing and deployment of both the frontend and backend offering greater flexibility and scalability.

---

### ## Technology and Design Philosophy

#### ### Backend Approach

The backend was designed to be a **stateless and scalable service**. The core approach involved creating a layered architecture where concerns are clearly separated. Incoming web requests are handled by a **routing layer**, which then passes them to a **controller layer** that contains the business logic. This logic interacts with a **data layer**, which for this project, was initiated with in-memory mock data to facilitate rapid development.

Functionality like **search, filtering, and pagination** was deliberately implemented on the server side. This ensures that data processing is handled efficiently on the backend and only the necessary structured data is sent to the client, minimizing network load and improving frontend performance.

#### ### Frontend Approach

The frontend was developed with a **component-based philosophy** using React. The user interface was broken down into small, reusable components (like `CourseCard`, and `CourseForm`) and composed together to build larger pages (`CourseListPage`, `AdminPage`).

- **State Management:** Local component state (e.g., search queries, form data, loading status) was managed efficiently using React Hooks (`useState`, `useEffect`).
- **Navigation:** `React Router` was used to handle all client-side routing, providing a fluid, multi-page experience without requiring full page reloads.
- **API Interaction:** A centralized **API service module** was created to manage all `HTTP` requests to the backend. This isolates data-fetching logic, making components cleaner and the overall code easier to maintain.
- **User Experience (UX):** A strong emphasis was placed on creating a clean, modern, and intuitive user interface. The **Material-UI (MUI)** component library was used to ensure a consistent, responsive, and aesthetically pleasing design. User feedback mechanisms like loading indicators, notifications and clear error messages were implemented to create a more polished and professional experience.

---

### ## Feature Implementation

The core requirements and bonus features were implemented by leveraging the strengths of this decoupled architecture. The frontend provides the interface for user actions which are then translated into API calls to the backend. The backend processes these requests, performs the necessary data manipulations and sends back a JSON response which the frontend then uses to update the UI.

The **Admin Panel**, for example, is simply another section of the React application that utilizes the same principles but communicates with protected `POST`, `PUT`, and `DELETE` endpoints on the backend to achieve full CRUD (Create, Read, Update, Delete) functionality.
