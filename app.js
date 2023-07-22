const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger/openapi.json");

const tasksRouter = require("./routes/api-tasks");
const usersRouter = require("./routes/api-users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
