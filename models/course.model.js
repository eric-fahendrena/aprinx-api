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

export const selectAllCourses = async (limit="10") => {
  const query = "SELECT courses.*, users.name AS author_name, users.picture AS author_picture FROM courses INNER JOIN users ON courses.author_id = users.id LIMIT $1";
  const result = await pool.query(query, [limit]);
  return result.rows;
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

export const insertCourseLike = async (likeData) => {
  const query = "INSERT INTO course_likes(course_id, user_id, date) VALUES($1, $2, $3) RETURNING *";
  const result = await pool.query(query, [
    likeData.course_id,
    likeData.user_id,
    Date.now(),
  ]);
  return result.rows[0];
}

export const deleteCourseLike = async (data) => {
  const query = "DELETE FROM course_likes WHERE course_id = $1 AND user_id = $2 RETURNING *";
  const result = await pool.query(query, [
    data.course_id,
    data.user_id,
  ]);
  return result.rows[0];
}

export const selectCourseLike = async (data) => {
  const query = "SELECT * FROM course_likes WHERE course_id = $1 AND user_id = $2";
  const result = await pool.query(query, [ data.course_id, data.user_id ]);
  return result.rows[0];
}
