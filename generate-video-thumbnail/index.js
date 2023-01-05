const { S3 } = require("aws-sdk");
const GenerateVideoThumbnail = require("./generate-video-thumbnail");
const pinoLogger = require("pino");

const logger = pinoLogger({
  name: process.env.APP_NAME,
  level: "info",
});

const s3 = new S3({ apiVersion: "2006-03-01" });

/**
 * Lambda for generating image an thumbnail from an uploaded video file
 * @param {S3Event} event
 * @returns {Promise<{body: string, statusCode: number}>}
 */
exports.handler = async (event) => {
  const promises = event.Records.map(async (record) => {
    const bucketName = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    const { ContentType, Body } = await s3
      .getObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();

    if (ContentType?.split("/")[0].toLowerCase() !== "video") {
      return;
    }

    return await new GenerateVideoThumbnail(
      logger,
      Body,
      key,
      s3,
      bucketName
    ).execute();
  });

  await Promise.all(promises);

  return {
    statusCode: 200,
    body: "",
  };
};
