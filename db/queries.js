const pool = require("./pool");

async function getAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

async function insertPost({ title, text, added, userID }) {
  await pool.query(
    "INSERT INTO posts (title, text, added, userID) VALUES ($1, $2, $3, $4)",
    [title, text, added, userID],
  );
}

async function changeToMember(userID) {
  await pool.query("UPDATE users SET member = 'true' WHERE id = ($1)", [
    userID,
  ]);
}
