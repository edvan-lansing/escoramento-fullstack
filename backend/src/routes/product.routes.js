const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deactivateProduct,
  activateProduct,
  getProductImage,
} = require("../controllers/product.controller");
const { validate } = require("../middleware/validate.middleware");
const { upload } = require("../middleware/upload.middleware");
const { authMiddleware, authorizeRoles } = require("../middleware/auth.middleware");
const { productSchema, updateProductSchema } = require("../validators/product.validator");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id/image", getProductImage);
router.get("/:id", getProductById);
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "editor", "manager"),
  upload.single("image"),
  validate(productSchema),
  createProduct
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "editor", "manager"),
  upload.single("image"),
  validate(updateProductSchema),
  updateProduct
);
router.delete("/:id", authMiddleware, authorizeRoles("admin", "manager"), deleteProduct);
router.patch("/:id/deactivate", authMiddleware, authorizeRoles("admin", "manager"), deactivateProduct);
router.patch("/:id/activate", authMiddleware, authorizeRoles("admin", "manager"), activateProduct);

module.exports = router;
