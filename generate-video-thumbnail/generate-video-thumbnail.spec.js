const GenerateVideoThumbnail = require("./generate-video-thumbnail");
const fs = require("fs");

jest.mock("simple-thumbnail");
jest.mock("fs");
jest.mock("md5", () => () => "md5test");

describe("generate-video-thumbnail", () => {
  const loggerMock = { info: jest.fn() };
  const s3Mock = {
    putObject: jest.fn().mockReturnValue({ promise: jest.fn() }),
  };

  jest.spyOn(fs, "readFileSync").mockReturnValue("thumbfileblob");

  test("Should generate and save thumbnail using the correct file name", async () => {
    const generateVideoThumbnail = new GenerateVideoThumbnail(
      loggerMock,
      "thevideoblob",
      "/user1/file",
      s3Mock,
      "testbucket"
    );

    await generateVideoThumbnail.execute();

    expect(s3Mock.putObject).toHaveBeenCalledWith({
      Bucket: "testbucket",
      Key: "/user1/file-thumbnail",
      ContentType: "image/jpeg",
      Body: "thumbfileblob",
    });
  });
});
