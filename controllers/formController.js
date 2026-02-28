const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const lengthErr = "must be between 1 and 40 characters.";
const textErr = "must be between 1 and 300 characters.";

const validateSignUpPost = [
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("username")
    .trim()
    .isEmail()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
];

const signUpPost = [
  validateSignUpPost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.insertUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        hashedPassword,
      });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
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
