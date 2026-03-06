const mongoose = require("mongoose");
const productService = require("../services/product.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/apiError");

const resolveImageUrl = (req) => {
  if (req.file?.filename) {
    return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  return req.body.image;
};

const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filters = {};

  if (category === "estaca" || category === "blindagem") {
    filters.category = category;
  }

  const products = await productService.getAllProducts(filters);
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await productService.getProductById(id);
  res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct({
    ...req.body,
    image: resolveImageUrl(req),
  });
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const payload = {
    ...req.body,
  };

  const imageUrl = resolveImageUrl(req);

  if (imageUrl !== undefined) {
    payload.image = imageUrl;
  }

  const product = await productService.updateProduct(id, payload);
  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  await productService.deleteProduct(id);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
