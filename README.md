# 🏛️ University Course Aggregator - Final Assessment Submission

This project is a full-stack web application designed to aggregate, store, and creatively display university course information. It has been built to meet the finalist stage technical assessment requirements, featuring a data-independent backend with a PostgreSQL database and a unique, user-friendly frontend built with React.

---

### ## How the System Works

The application is built on a modern, **decoupled client-server architecture**. This design separates the system into two independent parts that communicate over a network, offering greater flexibility and scalability.

- **🖥️ Backend API**: A robust backend service built with **Node.js** and the **Express** framework. Its only job is to manage data and business logic. It connects to a **PostgreSQL database** and exposes a RESTful API for creating, reading, filtering, and managing course information. It has no knowledge of how the data is presented.
- **🎨 Frontend Client**: A dynamic and interactive single-page application (SPA) created with **React**. This is what the user sees and interacts with. It is responsible for all aspects of the user interface. It fetches all the data it needs by making HTTP requests to the backend API.
- **🔒 Data Independence**: The system is designed to be self-reliant. Course information is stored in its own independent database. [cite_start]This ensures that even if the original source university website is unavailable, our application remains fully functional and continues to serve the stored data seamlessly[cite: 19].

---

### ## Design Decisions Made

Several key decisions were made to ensure the system is scalable, robust, and user-friendly.

#### ### Backend & Database

- **Database Choice**: **PostgreSQL** was selected as the database. Its relational nature, reliability, and support for advanced data types like arrays (used here for course modules) make it an excellent choice for structured academic data.
- [cite_start]**Normalized Schema**: A **three-table normalized schema** (`universities`, `departments`, `courses`) was designed[cite: 6]. [cite_start]This structure prevents data duplication (e.g., a university's name is stored only once) and makes the system easy to extend with more universities or departments in the future[cite: 21, 37].

#### ### Frontend & UI/UX

- [cite_start]**Creative Container Concept**: The central UI concept is the **"Course Comparison Dashboard."** This design moves beyond a simple list and provides an interactive tool for users[cite: 18]. [cite_start]It includes a searchable grid, advanced filters, and a unique comparison view, all intended to present the information with originality[cite: 22, 39, 40].
- **Component-Based Architecture**: The interface is built with reusable React components (e.g., `CourseCard`, `FilterSidebar`). This makes the code cleaner, easier to maintain, and more scalable.
- **User Experience (UX)**: Significant focus was placed on usability. [cite_start]Features like the dedicated sidebar for advanced filtering (by duration, mode of study, etc.) [cite: 52] [cite_start]and the course comparison tool [cite: 51] are designed to provide tangible value to a prospective student, making it easier to analyze and choose courses. [cite_start]The UI is also fully responsive for a polished experience on any device[cite: 53].

---

### ## How the Design Differs from the Source Site

[cite_start]Our design is not a replication of a standard university website; it is an intentional improvement upon it[cite: 17, 26, 39].

| Feature           | Standard University Website                                                             | Our Course Aggregator                                                                                                                                    |
| :---------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Layout**        | Typically a simple, static list spread across multiple pages.                           | A single, dynamic **dashboard** view with a filterable grid.                                                                                             |
| **Comparison**    | Requires the user to open multiple tabs or browser windows to compare courses manually. | [cite_start]A built-in **"Compare" feature** that displays selected courses in a dedicated, side-by-side table view for easy analysis[cite: 51].         |
| **Interactivity** | Often requires page reloads to apply filters or search.                                 | [cite_start]Provides **instant feedback** with live search and filters that update the view without reloading the page[cite: 52].                        |
| **Focus**         | Presents information from a single institution's perspective.                           | [cite_start]Designed to be **scalable**, allowing users to filter across multiple universities and departments from one central interface[cite: 21, 37]. |

---

### ## How to Run the Project Locally

[cite_start]Follow these steps to get the application running on your machine[cite: 27].

#### ### Prerequisites

- Node.js (v16 or higher)
- npm (or yarn)
- PostgreSQL server installed and running

#### ### Backend Setup

1.  Navigate to the `backend` directory: `cd backend`
2.  Install all required dependencies: `npm install`
3.  Create a `.env` file in the `backend` root and populate it with your PostgreSQL credentials.
    ```
    DB_USER=your_postgres_user
    DB_HOST=localhost
    DB_NAME=your_database_name
    DB_PASSWORD=your_postgres_password
    DB_PORT=5432
    ```
4.  Create a new database in PostgreSQL with the name you specified in the `.env` file.
5.  Run the schema and seed scripts to set up the tables and populate them with initial data:
    ```bash
    psql -U your_postgres_user -d your_database_name -f schema.sql
    psql -U your_postgres_user -d your_database_name -f seed.sql
    ```
6.  Start the backend development server: `npm run build && npm start`
    - The API will now be running on `http://localhost:5000`.

#### ### Frontend Setup

1.  Navigate to the `frontend` directory from the project root: `cd frontend`
2.  Install all required dependencies: `npm install`
3.  Start the frontend development server: `npm start`
    - The React application will automatically open in your browser at `http://localhost:3000`.
