const express = require("express");
const middleware = require("./utils/middleware");
const routes = require("./routes/index");
const config = require("./utils/config");
const logger = require("./utils/logger");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

mongoose.set("strictQuery", false);
logger.info("Connecting to: ", config.MONGODB_URL);
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.use("/", routes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
