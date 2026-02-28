const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function getAllPosts(req, res) {
  const posts = await db.getAllPosts();
  res.render("index", { title: "Members Only Board", posts: posts });
}

function newPostGet(req, res) {
  res.render("newPost", { title: "Add New Post" });
}

const lengthErr = "must be between 1 and 20 characters.";
const textErr = "must be between 1 and 300 characters.";

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lengthErr}`),
  body("text")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage(`Message ${textErr}`),
];

const newPostPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Add New Post",
        errors: errors.array(),
      });
    }

    const { title, text } = matchedData(req);
    const added = new Date();
    // add user id below
    await db.insertPost({ title, text, added, user });
    res.redirect("/");
  },
];

function newMemberGet(req, res) {
  res.render("newPost", { title: "Add New Post" });
}

async function newMemberPost(req, res) {
  // get user id for below
  const posts = await db.changeToMember(userID);
  res.render("index", { title: "Members Only Board", posts: posts });
}

module.exports = {
  getAllPosts,
  newPostGet,
  newPostPost,
  newMemberGet,
  newMemberPost,
};
