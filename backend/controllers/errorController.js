import dotenv from "dotenv";
import AppError from "../utils/appError.js";
dotenv.config();

const handleCastError = (error) => {
  const message = `Invalid ${error.path}:${error.value}`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errorsArr = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errorsArr.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const keyValue = err.keyValue || {};
  const keyNames = Object.keys(keyValue);

  let message = "Duplicate field value. Please use another one.";

  if (keyNames.includes("email")) {
    message = `The email "${keyValue.email}" is already in use.`;
  } else if (keyNames.includes("username")) {
    message = `The username "${keyValue.username}" is already taken.`;
  } else if (keyNames.includes("user") && keyNames.includes("post")) {
    message = `You've already bookmarked this job.`;
  }

  return new AppError(message, 400);
};

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR->", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationError(error);

    sendErrorForProd(error, res);
  }
};
