import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: "postgresql://postgres:NzYSYwrKJUGLQRIynFtRAxLRsuYWDVhP@autorack.proxy.rlwy.net:53151/railway"
});

export default pool;
