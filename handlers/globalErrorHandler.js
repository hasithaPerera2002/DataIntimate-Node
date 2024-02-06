import CustomErrorHandler from "./customErrorHandler.js";

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  if (error.name === "CastError")
    error = new CustomErrorHandler(
      `Invalid value for ${error.path} : ${error.value} `,
      400
    );
  if (error.code === 11000)
    error = new CustomErrorHandler(
      `Duplicate field value for ${error.keyValue.name}`,
      400
    );
  if (error.keyValue === "ValidationError") {
    const errors = Object.values(error.errors).map((val) => val.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    error = new CustomErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};

export default globalErrorHandler;
