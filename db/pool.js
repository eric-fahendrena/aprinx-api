import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
let config;

console.log('Initializing database connection pool...');
if (process.env.DATABASE_URL) {
  console.log('Database URL found, using it for connection.');
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  console.log('No Database URL found, using individual connection parameters.');
  config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
const pool = new Pool(config);

export default pool;
