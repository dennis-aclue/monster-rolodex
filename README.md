### Deployment to AWS S3 bucket with CDK ###

AWS Account need the IAM user role. It can be done inside the AWS user account configuration 

Download CLI (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-version.html)
https://awscli.amazonaws.com/AWSCLIV2-version.number.msi

e.g: https://awscli.amazonaws.com/AWSCLIV2-2.9.17.msi

Easy way to connect from local machine to Amazon AWS
To insert upcoming values, please login into AWS account, navigate to Securety Credentials, to see the user details. If you have no acces key, please create one
$> aws configure
AWS Access Key ID [None]: 'Your key'
AWS Secret Access Key [None]: 'Your secret key'
Default region name [None]: eu-central-1
Default output format [None]:

Create a new project to get all neccesary files automaticaly created, with command
$> cdk init app --language=typescript

You need these packages for aws s3 bucket deploy process

$> npm install @aws-cdk/core
$> npm install aws-s3
$> npm install @aws-cdk/aws-s3-deployment
$> npm install @aws-cdk/aws-route53
$> npm install @aws-cdk/aws-certificatemanager


$> npm install -g  aws-cdk
$> npm install aws-cdk-lib

$> npm install constructs

Before every deployment, check if a newer version of aws-cdk package is available!
$> npm update

Recap of manual steps:
1. Create React project
2. Create s3 bucket
3. Upload content to s3
4. Certified manager
5. AWS Cloud Front
6. Route53 (DNS)



