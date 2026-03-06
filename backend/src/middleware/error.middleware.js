const { ApiError } = require("../utils/apiError");

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};

module.exports = { errorMiddleware };
