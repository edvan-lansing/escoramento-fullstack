const Product = require("../models/Product");
const { ApiError } = require("../utils/apiError");

const getAllProducts = async (filters = {}) => {
  const products = await Product.find(filters);

  return products.sort((firstProduct, secondProduct) => {
    const firstOrder = Number.isFinite(firstProduct.displayOrder)
      ? firstProduct.displayOrder
      : Number.MAX_SAFE_INTEGER;
    const secondOrder = Number.isFinite(secondProduct.displayOrder)
      ? secondProduct.displayOrder
      : Number.MAX_SAFE_INTEGER;

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return new Date(secondProduct.createdAt).getTime() - new Date(firstProduct.createdAt).getTime();
  });
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const createProduct = async (payload) => Product.create(payload);

const updateProduct = async (id, payload) => {
  const product = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
};

const updateProductActiveStatus = async (id, isActive) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductActiveStatus,
};
