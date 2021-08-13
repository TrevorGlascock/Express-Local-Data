const express = require("express");
const notFound = require("./error/notFound");
const errorHandler = require("./error/errorHandler");

const app = express();

app.use(express.json());

// Pipeline
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
