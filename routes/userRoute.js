const userController = require("../Controllers/userController");

const router = require("express").Router();

router.get("/", userController.getAll);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);


module.exports = router;