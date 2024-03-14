const roleController = require("../Controllers/rolesController");

const router = require("express").Router();

router.get("/", roleController.getAll);
router.get("/:id", roleController.getRole);


module.exports = router;