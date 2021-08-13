const express = require("express");
const notFound = require("./error/notFound");
const errorHandler = require("./error/errorHandler");

const app = express();

app.use(express.json());

// Start of Pipeline

app.use(notFound);
app.use(errorHandler);

module.exports = app;
