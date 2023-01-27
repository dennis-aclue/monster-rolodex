# Deployment to AWS S3 bucket with CDK #

AWS Account need the IAM user role. It can be done inside the AWS user account configuration.
You can set up the user role under Security Credentials, IAM users, Users, Add user >
Add user name (s3bucket), enable console access (manage the password like you think), and click Next: Permissions >
Attach policies directly (e.g. AmazonS3FullAccess [better to use the least privilege principle, and create a new role with the least privileges, only access to a specific s3 bucket]), and click Next: Tags >
Add tags, and click Next: Review >
Create user.

Afterwards copy the user credentials, and save them in a safe place. You will need them later.
Now update the ~/.aws/credentials file, inside your home directory. 
Copy the user credentials to the file, and save it. For example:
>[s3bucket]  
> region = eu-central-1  
> role_arn= 'copy the role arn from the user details''  
> source_profile='source profile name'

Download and install CLI on your machine (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-version.html)
https://awscli.amazonaws.com/AWSCLIV2-version.number.msi

e.g: https://awscli.amazonaws.com/AWSCLIV2-2.9.17.msi

Easy way to connect from local machine to Amazon AWS
To insert upcoming values, please log in into AWS account, navigate to Security Credentials, to see the user details. If you have no access key, please create one
``` aws configure ```

> AWS Access Key ID [None]: 'Your key'  
> AWS Secret Access Key [None]: 'Your secret key'   
> Default region name [None]: eu-central-1  
> Default output format [None]:

**You need these packages for aws s3 bucket deploy process**

>``` npm install @aws-cdk/core ```  
> ``` npm install aws-s3 ```  
> ``` npm install @aws-cdk/aws-s3-deployment ```  
>``` npm install @aws-cdk/aws-route53 ```  
>``` npm install @aws-cdk/aws-certificatemanager ```  
> ``` npm install @aws-cdk/aws-cloudfront ```  
> ``` npm install @aws-cdk/aws-route53-targets ```

Before every deployment, check if a newer version of aws-cdk package is available!
``` npm update ```

**Recap of manual steps:**
1. Create React project
2. Create s3 bucket
3. Upload content to s3
4. Certified manager
5. AWS Cloud Front
6. Route53 (DNS)

If you have problems with the s3 bucket deployment and your user profile. You can add a new profile to your ~/.aws/credentials file, inside your home directory.
You need AWS CLI installed on your machine. Then you can add a new profile with command
$> aws configure --profile 'profile name'
and insert the values from your AWS account.
Afterwards you can use the profile name in the cdk.json file, to deploy the s3 bucket.

You can check the s3 buckets in your default AWS account, with command
``` aws s3 ls ```
and it will give you all the s3 buckets in your default account. If not, something went wrong with your profile settings.
If you want to check the s3 bucket content from different profile, you can use the command
``` aws s3 ls --profile 'profile name' ```

**Steps to deploy the s3 bucket:**  
Build the project with command
1. ``` npm run build ```  
Synth the project with command
2. ``` cdk synth ```  
Deploy the project with command
3. ``` cdk deploy --profile 'profile name' ```
You can concatenate the commands, and run them with one command, but it is not recommended, because if one command fails, the other commands will not be executed.
4. ``` npm run build && cdk synth && cdk deploy --profile 'profile name' ```

If some errors occur, during the deployment like:
failed: Error: This stack uses assets, so the toolkit stack must be deployed to the environment (Run "cdk bootstrap aws://'AccountNameOrNumber'/eu-central-1")
run the command
``` cdk bootstrap ```

You can use the phyton tool "awsume" to switch between profiles. It is a tool to switch between AWS profiles, and it is very useful.
Install the tool with command
``` pip install awsume ```
Therefor you need to have phyton installed on your machine and, on Windows, maybe you need more rights on phyton folder to install the tool.
After the installation, you can use the tool with command
``` awsume 'profile name' ```
and it will switch to the profile, and you can use the aws cli commands with the profile for approximately 1 hour.

To deploy to S3 and the other AWS services, you need these files:

- cdk.json (cdk.json is the configuration file for the CDK Toolkit)
- package.json (package.json is the configuration file for the Node.js package manager)
- tsconfig.json (tsconfig.json is the configuration file for the TypeScript compiler)
- bin/stack.ts (is the entrypoint of the CDK application. It will load the stack defined in the lib/*.stack.ts file
- lib/stack.ts (inside the lib folder, you can find the *.stack.ts file, which contains the code for the CDK application)

If no error occurs, you can see the s3 bucket in your AWS account.
