const express = require("express");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const urlsRouter = require("./urls/urls.router");

const app = express();

app.use(express.json());

// Pipeline
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
