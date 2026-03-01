const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const formController = require("../controllers/formController");
const passportController = require("../controllers/passportController");

indexRouter.get("/", indexController.getAllPosts);

indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", formController.signUpPost);

indexRouter.post("/log-in", passportController.logInPost);

indexRouter.get("/log-out", passportController.logOutGet);

indexRouter.get("/new-post", indexController.newPostGet);
indexRouter.post("/new-post", formController.newPostPost);

indexRouter.get("/join", indexController.newMemberGet);
indexRouter.post("/join", formController.newMemberPost);

module.exports = indexRouter;

// add admin in join page or new view

// add delete button for admin for each post
