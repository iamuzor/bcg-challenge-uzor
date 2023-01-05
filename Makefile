help:
	echo "Hello world"

unit_test:
	cd generate-video-thumbnail && npm install && npm run test
	cd get-upload-url && npm install && npm run test

deploy-dev:
	sam build --use-container
	sam deploy --stack-name progimage-dev --resolve-image-repos --resolve-s3 --no-confirm-changeset --capabilities CAPABILITY_IAM --region eu-west-2 --parameter-overrides StageName=dev

deploy-staging:
	sam build --use-container
	sam deploy --stack-name progimage-dev --resolve-image-repos --resolve-s3 --no-confirm-changeset --capabilities CAPABILITY_IAM --region eu-west-2 --parameter-overrides StageName=staging

deploy-production:
	sam build --use-container
	sam deploy --stack-name progimage-dev --resolve-image-repos --resolve-s3 --no-confirm-changeset --capabilities CAPABILITY_IAM --region eu-west-2 --parameter-overrides StageName=production