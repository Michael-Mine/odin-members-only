const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const passportController = require("../controllers/passportController");

indexRouter.get("/", indexController.getAllPosts);

indexRouter.get("/sign-up", passportController);
indexRouter.post("/sign-up", passportController);

indexRouter.get("/log-in", passportController);
indexRouter.post("/log-in", passportController);

indexRouter.get("/log-out", passportController);

indexRouter.get("/new-post", indexController.newPostGet);
indexRouter.post("/new-post", indexController.newPostPost);

indexRouter.get("/join", indexController.newMemberGet);
indexRouter.post("/join", indexController.newMemberPost);
