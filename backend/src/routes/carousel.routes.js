const express = require("express");
const {
  getAllCarouselItems,
  getCarouselItemById,
  createCarouselItem,
  updateCarouselItem,
  deactivateCarouselItem,
  activateCarouselItem,
  deleteCarouselItem,
} = require("../controllers/carousel.controller");
const { validate } = require("../middleware/validate.middleware");
const { upload } = require("../middleware/upload.middleware");
const { authMiddleware, authorizeRoles } = require("../middleware/auth.middleware");
const { carouselSchema, updateCarouselSchema } = require("../validators/carousel.validator");

const router = express.Router();

router.get("/", getAllCarouselItems);
router.get("/:id", getCarouselItemById);
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "editor", "manager"),
  upload.single("image"),
  validate(carouselSchema),
  createCarouselItem
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "editor", "manager"),
  upload.single("image"),
  validate(updateCarouselSchema),
  updateCarouselItem
);
router.patch("/:id/deactivate", authMiddleware, authorizeRoles("admin", "manager"), deactivateCarouselItem);
router.patch("/:id/activate", authMiddleware, authorizeRoles("admin", "manager"), activateCarouselItem);
router.delete("/:id", authMiddleware, authorizeRoles("admin", "manager"), deleteCarouselItem);

module.exports = router;
