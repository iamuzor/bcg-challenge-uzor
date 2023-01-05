const GetUploadUrl = require("./get-upload-url");
const { S3 } = require("aws-sdk");
const middy = require("@middy/core");
const Logger = require("./common/libs/logger");
const LoggerMiddleware = require("./common/middlewares/logger.middleware");
const ResponseMiddleware = require("./common/middlewares/response.middleware");

/**
 * Lambda for generating a file upload URL
 * @param {APIGatewayEvent} event
 * @returns {Promise<{body: string, statusCode: number}>}
 */
exports.handler = middy(async (event) => {
  const userId = event.requestContext?.authorizer?.claims["custom:userId"];
  const contentType =
    event.queryStringParameters?.contentType ?? "application/octet-stream";

  const { fileUrl, uploadUrl } = new GetUploadUrl(
    new S3({ signatureVersion: "v4" }),
    process.env.UPLOAD_BUCKET_NAME,
    Logger.getInstance()
  ).execute({ userId, contentType });

  return {
    fileUrl,
    uploadUrl,
  };
})
  .use(LoggerMiddleware())
  .use(ResponseMiddleware());
