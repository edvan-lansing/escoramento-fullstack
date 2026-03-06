const express = require("express");
const productRoutes = require("./product.routes");
const authRoutes = require("./auth.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/products", productRoutes);
router.use("/auth", authRoutes);

module.exports = router;
