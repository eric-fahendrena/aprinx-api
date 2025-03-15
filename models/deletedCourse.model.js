import pool from "../db/pool.js";

export const insertDeletedCourse = async (dcData) => {
  const query = "INSERT INTO deleted_courses (course_id, title, description, category, author_id, price, cover_photo, created_at, deleted_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
  const result = await pool.query(query, [
    dcData.id,
    dcData.title,
    dcData.description,
    dcData.category,
    dcData.author_id,
    dcData.price,
    dcData.cover_photo,
    dcData.date,
    Date.now(),
  ]);
  return result.rows[0];
}
