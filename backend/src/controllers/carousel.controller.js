const mongoose = require("mongoose");
const carouselService = require("../services/carousel.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/apiError");

const resolveImageUrl = (req) => {
  if (req.file?.buffer && req.file?.mimetype) {
    const base64Content = req.file.buffer.toString("base64");
    return `data:${req.file.mimetype};base64,${base64Content}`;
  }

  return req.body.image;
};

const getAllCarouselItems = asyncHandler(async (req, res) => {
  const { isActive } = req.query;
  const filters = {};

  if (isActive === "true") {
    filters.isActive = { $ne: false };
  }

  if (isActive === "false") {
    filters.isActive = false;
  }

  const carouselItems = await carouselService.getAllCarouselItems(filters);
  res.status(200).json(carouselItems);
});

const getCarouselItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid carousel item ID");
  }

  const carouselItem = await carouselService.getCarouselItemById(id);
  res.status(200).json(carouselItem);
});

const createCarouselItem = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    image: resolveImageUrl(req),
  };

  if (req.user?.role === "editor") {
    delete payload.displayOrder;
  }

  const carouselItem = await carouselService.createCarouselItem(payload);

  res.status(201).json(carouselItem);
});

const updateCarouselItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid carousel item ID");
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

  const carouselItem = await carouselService.updateCarouselItem(id, payload);
  res.status(200).json(carouselItem);
});

const deactivateCarouselItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid carousel item ID");
  }

  const carouselItem = await carouselService.updateCarouselActiveStatus(id, false);
  res.status(200).json(carouselItem);
});

const activateCarouselItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid carousel item ID");
  }

  const carouselItem = await carouselService.updateCarouselActiveStatus(id, true);
  res.status(200).json(carouselItem);
});

const deleteCarouselItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid carousel item ID");
  }

  await carouselService.deleteCarouselItem(id);
  res.status(200).json({ message: "Carousel item deleted successfully" });
});

module.exports = {
  getAllCarouselItems,
  getCarouselItemById,
  createCarouselItem,
  updateCarouselItem,
  deactivateCarouselItem,
  activateCarouselItem,
  deleteCarouselItem,
};
