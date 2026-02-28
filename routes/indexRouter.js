const { Router } = require("express");
const indexRouter = Router();
// const indexController = require("../controllers/indexController");

indexRouter.get("/");

indexRouter.get("/sign-up");
indexRouter.post("/sign-up");

indexRouter.get("/join");
indexRouter.post("/join");

indexRouter.get("/log-in");
indexRouter.post("/log-in");

indexRouter.get("/log-out");

indexRouter.get("/new-message");
indexRouter.post("/new-message");
