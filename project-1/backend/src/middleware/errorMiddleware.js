const { InternalServerError, ApiErrorResponse } = require('../utility/errorHandler');

const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const internalError = new InternalServerError('An unexpected error occurred.');
    ApiErrorResponse.send(internalError, res);
};

module.exports = globalErrorHandler;
