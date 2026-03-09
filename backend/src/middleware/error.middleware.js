const { ApiError } = require("../utils/apiError");

const errorMiddleware = (err, _req, res, _next) => {
  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors || {}).map((fieldError) => fieldError.message),
    });
  }

  if (err?.name === "MongoServerError" && err?.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value error",
      fields: Object.keys(err.keyPattern || {}),
    });
  }

  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};

module.exports = { errorMiddleware };
