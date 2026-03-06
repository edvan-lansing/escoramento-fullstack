require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./config/database");
const { env } = require("./config/env");

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
