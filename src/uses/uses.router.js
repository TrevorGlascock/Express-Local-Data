const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotSupported = require("../errors/methodNotSupported");

router
  .route("/:usesId")
  .get(controller.read) // read one specific user
  .delete(controller.delete) // delete one specific user
  .all(methodNotSupported); // all other methods unsupported
  
router
  .route("/")
  .get(controller.list) // list index of all users
  .all(methodNotSupported); // all other methods unsupported

module.exports = router;
