import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
let config;
// During tests, avoid creating a real DB pool which may attempt network connections.
let pool;

if (process.env.NODE_ENV === 'test') {
  // Provide a minimal stub for tests. If tests need DB, they should mock this module
  pool = {
    query: async () => {
      throw new Error('Database access attempted in test environment. Mock db/pool.js in your test.');
    },
    connect: async () => {
      throw new Error('Database access attempted in test environment. Mock db/pool.js in your test.');
    },
    end: async () => {},
  };
} else {
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
  pool = new Pool(config);
}

export default pool;
