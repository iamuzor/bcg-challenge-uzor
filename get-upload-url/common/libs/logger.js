const pino = require('pino')

class Logger {
    /**
     * @type {Logger}
     */
    static _instance = null

    constructor() {
        this._logger = pino({
            name: process.env.APP_NAME,
            level: 'info',
            timestamp: true
        })
    }

    /**
     * @returns {Logger}
     */
    static getInstance() {
        if (!this._instance) {
            this._instance = new Logger()
        }

        return this._instance
    }

    /**
     * @param args
     * @param message
     * @returns {void}
     */
    info(args, message) {
        this._logger.info(args, message)
    }

    /**
     * @param args
     * @param message
     * @returns {void}
     */
    error(args, message) {
        this._logger.error(args, message)
    }

    /**
     * @param args
     * @param message
     * @returns {void}
     */
    warn(args, message) {
        this._logger.warn(args, message)
    }
}

module.exports = Logger
