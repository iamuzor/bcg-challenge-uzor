# What

A generic media upload service for facilitating file uploads. The service is made up of two functions.

<br>

## GetUploadUrl

This is a lambda behind an API Gateway. It generates and returns a URL that can be used for uploading a file. The API is protected by AWS Cognito and an API key.

Example request;

```sh
curl --location --request GET 'https://dev.progimage.com/mediaservice/upload-url' \
--header 'x-api-key: example-key' \
--header 'Authorization: Bearer example-token'
```

Example response;

```json
{
  "data": {
    "uploadUrl": "https://progimage-uploads-dev.s3.eu-west-2.amazonaws.com/6885efcd-34cf-4097-a76b-b6bf82392c95/dd0af914-14ff-41d5-9bda-29dd0420c4ae",
    "fileUrl": "https://progimage-uploads-dev.s3.eu-west-2.amazonaws.com/6885efcd-34cf-4097-a76b-b6bf82392c95/dd0af914-14ff-41d5-9bda-29dd0420c4ae?Content-Type=application%2Foctet-stream&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXF7CPMIIXC2LP4BH%2F20230105%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230105T133318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMiJHMEUCIDhRro5Hb3a7MVwYXLQjeGtGCI4v3Z3aby%2Bv85TMcHTOAiEAoYG08qKJQG28wBE1vFO4rzblguxbyOXxXw3NkGc8H%2FwqqwMIFxAAGgw0OTM4NTkzMzI2MjUiDHSqRSC0oYET4R%2BeGCqIAx2lpjSiKB%2BAq%2B%2BsWE37gQD23vlyLICoCgiUQU6TYZwM1KAUSj%2BB1Me0Ih463mClaNWMPL5RxaBAa13Qt0RcE80n7CnmoVWpyR7%2FiEQDmo2lJ%2BJhG%2FZA%2Buidsjds82nWjALQjjZ9ECL53lqxZvbd0dqlRGmOFs9q1ouVYHSdlIX%2Bzr8GCI9%2F%2FIeBb1%2BdUOUDKeYP8USBBIw%2FoRJNtaIXJ%2FbTt79y%2Bi%2F8O%2FTIZ36PqwdYw%2F3H5w%2FFoAd6%2BtlU3k%2Fe6qTnC5RT0A5s39E7N45YY3LH6vUFP5dhYCMPSfQNqR5vOY25MQ6WBAn4ydOjDGsJLs7sKLEkTGAhekycscXNpwrE41wLEH9cNk3YnsBdg4qOyd45ILwk19dzB%2BIusUKica5R4XWbbOkExiKCYxnVKdN%2FWuqgOqVQH9Q%2B7JfigmCwcXNMFm6CeY%2F29Rd8hKdz4LucPt5m6PYP0Sma1vU09NHmr7nnbHfvT%2BdkhHfsAFXH2rzdXSM7OGKRBHTLeu092qnZTTcZycjKMJyj250GOp0BesPkJkXVneYQmo%2B3%2Faigmh2%2F4ExkyEX19fQR%2B5tgEyGP571MaF2BwFpkOB0U3TNFra2VzuBJHg5jWbRZrOXgGR3xPLBi9CKwl87JZB%2FI0VaIqbKbMoLL8q9MIE0%2FPbzf4o1OgTDB%2FP8cROHyxWYYDi9LRAC2ioLp3e2MVrB5B5mxhqVqw3%2BZoVD7c0DjLoiaewUKqX5533fBpgbRrw%3D%3D&X-Amz-Signature=247f9c3ede32071ff52da1d9f67839e8a5b16116fc367eff364d089278501f20&X-Amz-SignedHeaders=host"
  }
}
```

- `uploadUrl` is the endpoint to upload the file to.
- `fileUrl` is the URL location of the file. Can be used to download the file, or display the file in a browser if it is an image or a video.

### Dependencies:

- AWS API Gateway - for defining the API endpoint.
- AWS Cognito - for securing the API endpoint. Ensuring only an authorized client (or user) is allowed to do uploads.
- AWS S3 - for generating S3 signed URLs.

<br>

## GenerateVideoThumbnail

A lambda that generates a JPEG thumbnail image from an uploaded file, given it is a video file. The thumbnail is then saved to S3.

This lambda is triggered by S3. So when a client uploads a file, this lambda gets triggered.

### Dependencies:

- AWS S3 - for generating S3 signed URLs.

<br>

# Testing

### Unit test

```sh
$ make unit_test
```

<br>

# Deployment

### AWS SAM

For defining the AWS resources.

### Bitbucket Pipeline

For handling deployment. See `./bitbucket-pipelines.yml`.

### How to deploy

```sh
$ make deploy-dev # to deploy to dev environment
$ make deploy-staging # to deploy to staging environment
$ make deploy-production # to deploy to production environment
```
