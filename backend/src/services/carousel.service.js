const Carousel = require("../models/Carousel");
const { ApiError } = require("../utils/apiError");

const getAllCarouselItems = async (filters = {}) => {
  const carouselItems = await Carousel.find(filters);

  return carouselItems.sort((firstItem, secondItem) => {
    const firstOrder = Number.isFinite(firstItem.displayOrder)
      ? firstItem.displayOrder
      : Number.MAX_SAFE_INTEGER;
    const secondOrder = Number.isFinite(secondItem.displayOrder)
      ? secondItem.displayOrder
      : Number.MAX_SAFE_INTEGER;

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return new Date(secondItem.createdAt).getTime() - new Date(firstItem.createdAt).getTime();
  });
};

const getCarouselItemById = async (id) => {
  const carouselItem = await Carousel.findById(id);

  if (!carouselItem) {
    throw new ApiError(404, "Carousel item not found");
  }

  return carouselItem;
};

const createCarouselItem = async (payload) => Carousel.create(payload);

const updateCarouselItem = async (id, payload) => {
  const carouselItem = await Carousel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!carouselItem) {
    throw new ApiError(404, "Carousel item not found");
  }

  return carouselItem;
};

const updateCarouselActiveStatus = async (id, isActive) => {
  const carouselItem = await Carousel.findByIdAndUpdate(
    id,
    { isActive },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!carouselItem) {
    throw new ApiError(404, "Carousel item not found");
  }

  return carouselItem;
};

const deleteCarouselItem = async (id) => {
  const carouselItem = await Carousel.findByIdAndDelete(id);

  if (!carouselItem) {
    throw new ApiError(404, "Carousel item not found");
  }
};

module.exports = {
  getAllCarouselItems,
  getCarouselItemById,
  createCarouselItem,
  updateCarouselItem,
  updateCarouselActiveStatus,
  deleteCarouselItem,
};
