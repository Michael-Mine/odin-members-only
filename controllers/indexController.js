const db = require("../db/queries");

async function getAllPosts(req, res) {
  const posts = await db.getAllPosts();
  res.render("index", {
    title: "Members Only Board",
    posts: posts,
    user: req.user,
  });
}

function signUpGet(req, res) {
  res.render("forms/signUp", { title: "Sign Up" });
}

function newPostGet(req, res) {
  res.render("newPost", { title: "Add New Post" });
}

function newMemberGet(req, res) {
  // password check
  res.render("newMember", { title: "Join the Club" });
}

async function newMemberPost(req, res) {
  // get user id for below

  const posts = await db.changeToMember(userID);
  res.render("index", {
    title: "Members Only Board",
    posts: posts,
    user: req.user,
  });
}

module.exports = {
  getAllPosts,
  signUpGet,
  newPostGet,
  newMemberGet,
  newMemberPost,
};
