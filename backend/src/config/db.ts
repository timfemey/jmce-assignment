import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_USER
    ? undefined
    : "postgresql://femi:6eGe0NbCl2i1cBw4McWM3Md2TmZlWVhw@dpg-d3mgire3jp1c73fuun70-a/jmce", //Wont work unless running on the cloud with my particular account
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
});

export default pool;
