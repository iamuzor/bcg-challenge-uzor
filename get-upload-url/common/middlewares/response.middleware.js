const getErrorStatusCode = (error) => {
    if (error.name === 'BadRequestError') {
        return 400;
    }

    return Object.prototype.hasOwnProperty.call(error, 'code') &&
    error.code >= 100 &&
    error.code <= 599
        ? error.code
        : 500;
};

const getErrorMessage = (error) => {
    if (Object.prototype.hasOwnProperty.call(error, 'message')) {
        return error.message;
    }

    return 'Internal Server Error';
};

const ResponseMiddleware = () => {
    return {
        after: (request) => {
            request.response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: request.response,
                }),
            };
        },
        onError: (request) => {
            const statusCode = getErrorStatusCode(request.error);
            const message = getErrorMessage(request.error);

            request.response = {
                statusCode: statusCode,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    error: request.error.name,
                    message,
                }),
            };
        },
    };
};

module.exports = ResponseMiddleware
