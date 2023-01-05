const Logger = require("../libs/logger");

const LoggerMiddleware = () => {
    return {
        onError: (request) => {
            Logger.getInstance().error(request.error)
        },
    };
};

module.exports = LoggerMiddleware;
