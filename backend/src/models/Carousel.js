const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      required: [true, "Carousel title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    ctaLabel: {
      type: String,
      trim: true,
      default: "",
    },
    ctaLink: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carousel", carouselSchema);
