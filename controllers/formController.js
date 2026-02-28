const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

async function signUpPost(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
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

module.exports = {
  signUpPost,
  newPostPost,
};
