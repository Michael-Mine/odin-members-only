const pool = require("./pool");

async function getAllPosts() {
  const { rows } = await pool.query("SELECT * FROM user_posts");
  return rows;
}

async function insertUser({ firstName, lastName, username, hashedPassword }) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, hashedPassword],
  );
}
//change to username as can get from req.user?
async function insertPost({ title, text, added, userID }) {
  await pool.query(
    "INSERT INTO user_posts (title, text, added, userID) VALUES ($1, $2, $3, $4)",
    [title, text, added, userID],
  );
}
//change to username as can get from req.user?
async function changeToMember(userID) {
  await pool.query("UPDATE users SET member = 'true' WHERE id = ($1)", [
    userID,
  ]);
}

module.exports = {
  getAllPosts,
  insertUser,
  insertPost,
  changeToMember,
};
