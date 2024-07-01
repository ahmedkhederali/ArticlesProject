class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = Number(err.statusCode) || 500;
    err.status = err.status || 'error';
  
    let errorMessage;
    switch (err.statusCode) {
      case 400:
        errorMessage = 'Bad Request: Please check your input.';
        break;
      case 401:
        errorMessage = 'Unauthorized: Please authenticate.';
        break;
      case 403:
        errorMessage = 'Forbidden: You do not have permission to perform this action.';
        break;
      case 404:
        errorMessage = 'Not Found: The requested resource could not be found.';
        break;
      case 500:
        errorMessage = 'Internal Server Error: Something went wrong on our end.';
        break;
      default:
        errorMessage = err.message || 'An unexpected error occurred.';
    }
  
    res.status(err.statusCode).json({
      status: err.status,
      message: errorMessage,
    });
  };
  
  module.exports = { AppError, globalErrorHandler };
  