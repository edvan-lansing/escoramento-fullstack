const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");
const { ApiError } = require("../utils/apiError");

const authMiddleware = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).lean();

    if (!user) {
      throw new ApiError(401, "Unauthorized");
    }

    req.user = {
      id: String(user._id),
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    return next(error);
  }
};

const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, "Forbidden"));
  }

  return next();
};

const adminMiddleware = (req, _res, next) => {
  return authorizeRoles("admin")(req, _res, next);
};

module.exports = { authMiddleware, authorizeRoles, adminMiddleware };
