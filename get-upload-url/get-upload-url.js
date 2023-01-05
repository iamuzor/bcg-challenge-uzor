const uuid = require('uuid').v4

class GetUploadUrl {
    /**
     * @param {S3} s3
     * @param {String} bucketName
     * @param {Logger} logger
     */
    constructor(s3, bucketName, logger) {
        this.s3 = s3;
        this.bucketName = bucketName;
        this.logger = logger;
    }

    /**
     * @param {Object} props
     * @param {String} props.contentType
     * @param {String} props.userId
     * @return {{uploadUrl, fileUrl}}
     */
    execute(props) {
        this.logger.info({...props}, "Generating upload url..");

        const key = `${props.userId}/${uuid()}`;

        const uploadUrl = this.s3.getSignedUrl("putObject", {
            Bucket: this.bucketName,
            Key: key,
            ContentType: props.contentType,
            Expires: 3600
        });

        this.logger.info({...props, uploadUrl}, "Upload url URL generated");

        return {
            uploadUrl: uploadUrl,
            fileUrl: uploadUrl.split("?")[0]
        };
    }
}

module.exports = GetUploadUrl