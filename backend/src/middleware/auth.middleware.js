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
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { authMiddleware };
