const imageController = require("../Controllers/imageController");

const router = require("express").Router();

router.get("/", imageController.getAll);
router.post("/", imageController.upload);
router.patch("/:id", imageController.update);
router.get("/:id", imageController.getImage);


module.exports = router;