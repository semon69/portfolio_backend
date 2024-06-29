import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
  ) => {
    const statusCode = err.status || 500;
    const success = false;
    const message = err?.message || "Something went wrong";
    const error = err;
  
    res.status(statusCode).send({
      success,
      message,
      error,
    });
    next();
  };
  export default globalErrorHandler;