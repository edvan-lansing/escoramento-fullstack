const mongoose = require("mongoose");
const productService = require("../services/product.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/apiError");

const resolveImageUrl = (req) => {
  if (req.file?.buffer && req.file?.mimetype) {
    const base64Content = req.file.buffer.toString("base64");
    return `data:${req.file.mimetype};base64,${base64Content}`;
  }

  return req.body.image;
};

const getAllProducts = asyncHandler(async (req, res) => {
  const { category, isActive } = req.query;
  const filters = {};

  if (category === "estaca" || category === "blindagem") {
    filters.category = category;
  }

  if (isActive === "true") {
    filters.isActive = { $ne: false };
  }

  if (isActive === "false") {
    filters.isActive = false;
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
  const payload = {
    ...req.body,
    image: resolveImageUrl(req),
  };

  if (req.user?.role === "editor") {
    delete payload.displayOrder;
  }

  const product = await productService.createProduct(payload);
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

  if (req.user?.role === "editor") {
    delete payload.displayOrder;
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

const deactivateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await productService.updateProductActiveStatus(id, false);
  res.status(200).json(product);
});

const activateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await productService.updateProductActiveStatus(id, true);
  res.status(200).json(product);
});

const getProductImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await productService.getProductById(id);

  if (!product?.image) {
    throw new ApiError(404, "Product image not found");
  }

  const imageString = product.image.trim();

  if (!imageString.startsWith("data:")) {
    throw new ApiError(400, "Invalid image format");
  }

  const matches = imageString.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new ApiError(400, "Invalid base64 image format");
  }

  const [, mimeType, base64Data] = matches;
  const buffer = Buffer.from(base64Data, "base64");

  res.set("Content-Type", mimeType);
  res.set("Cache-Control", "public, max-age=86400");
  res.send(buffer);
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deactivateProduct,
  activateProduct,
  getProductImage,
};
