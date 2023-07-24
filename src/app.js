const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/index");
const ApiError = require("./utils/ApiError");
const app = express();

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//enable cors
app.use(cors());
app.options("*", cors());

//Routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
