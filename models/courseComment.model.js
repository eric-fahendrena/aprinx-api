import pool from "../db/pool.js";

export const insertComment = async (cmtData) => {
  const query = "INSERT INTO course_comments(author_id, course_id, message, parent_id, date) VALUES($1, $2, $3, $4, $5) RETURNING *";
  const result = await pool.query(query, [
    cmtData.author_id,
    cmtData.course_id,
    cmtData.message,
    cmtData.parend_id,
    Date.now(),
  ]);
  return result.rows[0];
}

export const selectComments = async (cId, limit, offset) => {
  const query = "SELECT course_comments.*, users.name AS author_name, users.picture AS author_picture FROM course_comments INNER JOIN users ON users.id = course_comments.author_id WHERE course_id = $1 ORDER BY course_comments.id DESC LIMIT $2 OFFSET $3";
  const result = await pool.query(query, [ cId, limit, offset ]);
  return result.rows;
}

export const selectCommentById = async (commentId) => {
  const query = "SELECT course_comments.*, users.name AS author_name FROM course_comments INNER JOIN users ON users.id = course_comments.author_id WHERE course_comments.id = $1";
  const result = await pool.query(query, [ commentId ]);
  return result.rows[0];
}

export const selectCommentsCount = async (cId) => {
  const query = "SELECT COUNT(*) AS total FROM course_comments WHERE course_id = $1";
  const result = await pool.query(query, [ cId ]);
  return result.rows[0].total;
}
