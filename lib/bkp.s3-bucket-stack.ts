/*
  Configure S3 Bucket
*/
import * as cdk from 'aws-cdk-lib/core';
// https://github.com/aws/aws-cdk/issues/17950
// Resolves the following error:
// Error: Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './core' is not defined by "exports"
import { Stack, App, aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class S3BucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    this.bucket = new s3.Bucket(this, 'MonsterRolodexBucket', {
      versioned: false,
      bucketName: 'MonsterRolodexBucket',
      // True if you want to allow public access to all objects in the bucket
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // "DESTROY"" if you want to delete all objects from the bucket when the bucket is deleted
      removalPolicy: cdk.RemovalPolicy.RETAIN,

  });
  }
}
