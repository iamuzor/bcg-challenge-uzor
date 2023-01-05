const GetUploadUrl = require("./get-upload-url");
const Logger = require("./common/libs/logger");

describe('GetSignedUrl', () => {
    const s3Mock = {getSignedUrl: jest.fn()}

    const getUploadUrl = new GetUploadUrl(
        s3Mock,
        'testbucket',
        Logger.getInstance()
    )

    afterEach(() => {
        s3Mock.getSignedUrl.mockClear()
    })

    test('Should return uploadUrl and fileUrl', async () => {
        s3Mock.getSignedUrl.mockReturnValueOnce('https://test.com?sometext=123');

        const response = getUploadUrl.execute({
            contentType: 'image/png',
            userId: 'user-1',
        });

        expect(response).toEqual({
            uploadUrl: 'https://test.com?sometext=123',
            fileUrl: 'https://test.com',
        });
        expect(s3Mock.getSignedUrl).toHaveBeenCalledWith(
            'putObject',
            expect.objectContaining({
                Bucket: 'testbucket',
                Key: expect.any(String),
                ContentType: 'image/png',
                Expires: 3600,
            })
        );
    });
});
