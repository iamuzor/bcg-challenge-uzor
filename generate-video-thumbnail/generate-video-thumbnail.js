const fs = require('fs')
const genThumbnail = require('simple-thumbnail')
const md5 = require('md5')

class GenerateVideoThumbnail {
    /**
     * @param {Object} logger
     * @param {Buffer} video
     * @param {String} filename
     * @param {AWS.S3} s3
     * @param {String} s3Bucket
     */
    constructor(logger, video, filename, s3, s3Bucket) {
        this._logger = logger
        this._video = video
        this._filename = filename
        this._s3 = s3
        this._bucket = s3Bucket;

        const thePath = `/tmp/` + md5(this._filename)

        this._videoTmpPath = thePath;
        this._thumbnailTmpPath = `${thePath}.jpg`;
    }

    /**
     * @returns {Promise<void>}
     */
    async execute() {
        await this._generateThumbnail();
        await this._upload();
        await this._cleanup();
    }

    /**
     * @returns {Promise<void>}
     */
    async _generateThumbnail() {
        this._logger.info('Generating thumbnail...')

        fs.writeFileSync(this._videoTmpPath, this._video);

        await genThumbnail(this._videoTmpPath, this._thumbnailTmpPath, "500x?");

        this._logger.info('Generated thumbnail.')
    }

    /**
     * @returns {Promise<void>}
     */
    async _upload() {
        this._logger.info('Uploading thumbnail...')

        await this._s3.putObject({
            Bucket: this._bucket,
            Key: `${this._filename}-thumbnail`,
            ContentType: 'image/jpeg',
            Body: fs.readFileSync(this._thumbnailTmpPath)
        }).promise();

        this._logger.info({path: `${this._filename}-thumbnail`}, 'Uploaded thumbnail')
    }

    /**
     * @returns {void}
     */
    _cleanup() {
        this._logger.info('Cleaning up...')

        fs.unlinkSync(this._videoTmpPath);
        fs.unlinkSync(this._thumbnailTmpPath);

        this._logger.info('Cleaned up.')
    }
}

module.exports = GenerateVideoThumbnail