const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const { corsOptions } = require("./config/cors");
const { notFound } = require("./middleware/notFound.middleware");
const { errorMiddleware } = require("./middleware/error.middleware");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use("/api", routes);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;
