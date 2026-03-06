const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { validate } = require("../middleware/validate.middleware");
const { upload } = require("../middleware/upload.middleware");
const { productSchema, updateProductSchema } = require("../validators/product.validator");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), validate(productSchema), createProduct);
router.put("/:id", upload.single("image"), validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
