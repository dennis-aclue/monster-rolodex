import { App, Stack, StackProps } from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';
import * as route53Targets from '@aws-cdk/aws-route53-targets';

export class MonstersRolodexStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // First, create a s3 bucket
    // Bucket name must be globally unique and must not contain spaces or uppercase letters.
    const bucket = new s3.Bucket(this, 'MonsterRolodexBucket', {
      bucketName: 'monster-rolodex-bucket',
      // True if you want to allow public access to all objects in the bucket
      publicReadAccess: false,
    }
    );

    // Then, deploy the contents of the 'website' directory to the bucket
    // This will overwrite any existing files in the bucket
    // This will also delete any files in the bucket that are not in the 'website' directory
    // It will copy the content from ./build to the destination bucket
    new s3Deploy.BucketDeployment(this, 'S3Deploy', {
      sources: [s3Deploy.Source.asset('./build')],
      destinationBucket: bucket,
    });

    /*
    // Create the certificate for the domain with ACM (AWS Certificate Manager)
    const domainName = 'chairshare.de'
    const subDomainName = 'cs.chairshare.de';

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: domainName,
    });

    // Create the certificate for the domain with ACM (AWS Certificate Manager)
    const certificate = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: subDomainName + '.' + domainName,
      hostedZone: zone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    });
    */

    // Create the CloudFront distribution
    const identity = new cloudfront.OriginAccessIdentity(this, 'OAI');
    // Allow the CloudFront distribution to access the bucket contents
    bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(identity.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    }));

    /*
    // If you want to use a custom domain, you need to create a CNAME record in Route53
    // that points to the CloudFront distribution domain name.
    // The CloudFront distribution domain name is available as an attribute on the distribution.
    // The format of the domain name is: d111111abcdef8.cloudfront.net.

    const viewCertificate = cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
      aliases: [subDomainName + '.' + domainName],
      securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2018,
      sslMethod: cloudfront.SSLMethod.SNI,
    });

    */


    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: identity,
          },
          behaviors: [{
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
            compress: true,
            isDefaultBehavior: true,
           }],
        },
      ],
      defaultRootObject: 'index.html',
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
    });
    /*
new route53.ARecord(this, 'AliasRecord', {
      recordName: subDomainName + '.' + domainName,
      target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(distribution)),
      zone,
    });
    */
  }
}
