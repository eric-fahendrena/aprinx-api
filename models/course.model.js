import pool from "../db/pool.js";


export const addCourse = async (cData) => {
  if (!cData.cover_photo || !cData.category || !cData.title || !cData.description) {
    throw new Error("invalid credentials");
  }
  const query = "INSERT INTO courses(author_id, cover_photo, category, title, description, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const result = await pool.query(query, [
    cData.author_id,
    cData.cover_photo,
    cData.category,
    cData.title,
    cData.description,
    Date.now(),
  ]);
  return result.rows[0];
}

export const selectAllCourses = async (limit="10") => {
  const query = "SELECT courses.*, users.name AS author_name, users.picture AS author_picture FROM courses INNER JOIN users ON courses.author_id = users.id LIMIT $1";
  const result = await pool.query(query, [limit]);
  console.log(result.rows);
  return result.rows;
}

export const selectCourse = async (cId) => {
  const query = "SELECT courses.*, users.name AS author_name, users.picture AS author_picture FROM courses INNER JOIN users ON courses.author_id = users.id WHERE courses.id = $1";
  const result = await pool.query(query, [cId]);
  return result.rows[0];
}
