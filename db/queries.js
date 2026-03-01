const pool = require("./pool");

async function getAllPosts() {
  const { rows } = await pool.query(
    "SELECT user_posts.title, user_posts.text, user_posts.added, users.firstname, users.lastname FROM user_posts INNER JOIN users ON user_posts.id = users.id",
  );
  return rows;
}

async function checkUserExists(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = ($1)",
    [username],
  );
  return rows;
}

async function insertUser({ firstName, lastName, username, hashedPassword }) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, hashedPassword],
  );
}

async function insertPost({ title, text, added, userID }) {
  await pool.query(
    "INSERT INTO user_posts (title, text, added, userID) VALUES ($1, $2, $3, $4)",
    [title, text, added, userID],
  );
}

async function changeToMember(userID) {
  await pool.query("UPDATE users SET member = 'true' WHERE id = ($1)", [
    userID,
  ]);
}

async function changeToAdmin(userID) {
  await pool.query("UPDATE users SET admin = 'true' WHERE id = ($1)", [userID]);
}

module.exports = {
  getAllPosts,
  checkUserExists,
  insertUser,
  insertPost,
  changeToMember,
  changeToAdmin,
};
