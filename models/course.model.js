import pool from "../db/pool.js";

export const addCourse = async (cData) => {
  console.log("C data", cData);
  if (!cData.cover_photo || !cData.category || !cData.title || !cData.description) {
    console.error("Invalid credential");
    return false;
  }
  const query = "INSERT INTO courses(author_id, cover_photo, category, price, title, description, date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const result = await pool.query(query, [
    cData.author_id,
    cData.cover_photo,
    cData.category,
    cData.price,
    cData.title,
    cData.description,
    Date.now(),
  ]);
  return result.rows[0];
}

export const deleteCourse = async (courseId) => {
  const query = "DELETE FROM courses WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [ courseId ]);
  return result.rows[0]
}

export const selectAllCourses = async (offset, limit) => {
  const query = "SELECT courses.*, users.name AS author_name, users.picture AS author_picture, teacher_subscriptions.date AS author_subscription_date FROM courses INNER JOIN users ON courses.author_id = users.id INNER JOIN teacher_subscriptions ON courses.author_id = teacher_subscriptions.user_id ORDER BY courses.date DESC OFFSET $1 LIMIT $2";
  const result = await pool.query(query, [ offset, limit ]);
  return result.rows;
}

export const selectCoursesByKeyword = async (keyword, offset, limit) => {
  const query = "SELECT courses.*, users.name AS author_name, users.picture AS author_picture FROM courses INNER JOIN users ON courses.author_id = users.id WHERE courses.title ILIKE $1 OR courses.description ILIKE $1 OR courses.category ILIKE $1 ORDER BY courses.date DESC OFFSET $2 LIMIT $3";
  const result = await pool.query(query, [ `%${keyword}%`, offset, limit ]);
  return result.rows;
}

export const selectCoursePrice = async (courseId) => {
  const query = "SELECT price FROM courses WHERE id = $1";
  const result = await pool.query(query, [ courseId ]);
  return result.rows[0].price;
}

export const selectCourse = async (cId) => {
  const query = "SELECT courses.*, users.name AS author_name, users.picture AS author_picture, users.phone_number AS author_phone_number, users.phone_number_associated_name AS author_number_associated_name FROM courses INNER JOIN users ON courses.author_id = users.id WHERE courses.id = $1";
  const result = await pool.query(query, [cId]);
  return result.rows[0];
}

export const selectRandCourse = async () => {
  const query = `SELECT courses.*, users.name AS author_name, users.picture AS author_picture FROM courses INNER JOIN users ON courses.author_id = users.id ORDER BY RANDOM() LIMIT 1`;
  const { rows } = await pool.query(query);
  return rows[0];
}

export const addVideo = async (vData) => {
  const query = "INSERT INTO course_videos(author_id, course_id, title, description, access, url, thumbnail, date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const result = await pool.query(query, [
    vData.author_id,
    vData.course_id,
    vData.title,
    vData.description,
    vData.access,
    vData.url,
    vData.thumbnail,
    Date.now(),
  ]);
  return result.rows[0];
}

export const selectVideos = async (cId) => {
  const query = "SELECT course_videos.*, users.name AS author_name, users.picture AS author_picture FROM course_videos INNER JOIN users ON course_videos.author_id = users.id WHERE course_videos.course_id = $1";
  const result = await pool.query(query, [
    cId,
  ]);
  return result.rows;
}

export const selectVideo = async (cId, vId) => {
  const query = "SELECT course_videos.*, courses.category AS course_category, users.name AS author_name, users.picture AS author_picture FROM course_videos INNER JOIN users ON course_videos.author_id = users.id INNER JOIN courses ON course_videos.course_id = courses.id WHERE course_videos.course_id = $1 AND course_videos.id = $2"
  const result = await pool.query(query, [
    cId,
    vId,
  ]);
  return result.rows[0];
}
