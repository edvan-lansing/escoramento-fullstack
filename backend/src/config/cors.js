const { env } = require("./env");

const corsOptions = {
  origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(",").map((v) => v.trim()),
  credentials: true,
};

module.exports = { corsOptions };
