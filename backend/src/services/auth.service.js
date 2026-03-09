const User = require("../models/User");
const { ApiError } = require("../utils/apiError");
const { signToken } = require("../utils/jwt");

const normalizeEmail = (email) => email?.trim().toLowerCase();

const register = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new ApiError(409, "Email is already in use");
  }

  const user = await User.create({ email: normalizedEmail, password, role: "admin" });

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token: signToken({ sub: user._id, role: user.role }),
  };
};

const login = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
    token: signToken({ sub: user._id, role: user.role }),
  };
};

module.exports = { register, login };
