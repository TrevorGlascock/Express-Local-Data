const router = require("express").Router();
const usesRouter = require("../uses/uses.router");
const controller = require("./urls.controller");
const methodNotSupported = require("../errors/methodNotSupported");

router.use("/:urlId/uses", controller.urlExists, usesRouter);

router
  .route("/:urlId")
  .get(controller.read) // read one specific url
  .put(controller.update) // update one specific url
  .all(methodNotSupported); // All else unsupported

router
  .route("/")
  .get(controller.list) // list index of urls
  .post(controller.create) // create a new url
  .all(methodNotSupported); // All else unsupported

module.exports = router;
