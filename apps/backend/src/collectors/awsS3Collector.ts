'''
import { S3Client, ListBucketsCommand, GetBucketAclCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const s3Client = new S3Client({});
const dynamoDbClient = new DynamoDBClient({});

export const handler = async (): Promise<void> => {
  console.log('Starting S3 public bucket check...');
  const tenantId = 'simulated-tenant-123';

  let publicBucketsCount = 0;

  try {
    const { Buckets } = await s3Client.send(new ListBucketsCommand({}));

    if (Buckets) {
      for (const bucket of Buckets) {
        const bucketName = bucket.Name;
        try {
          const acl = await s3Client.send(new GetBucketAclCommand({ Bucket: bucketName }));
          const isPublic = acl.Grants?.some(
            (grant) => grant.Grantee?.URI === 'http://acs.amazonaws.com/groups/global/AllUsers'
          );

          if (isPublic) {
            publicBucketsCount++;
            console.log(`Bucket [${bucketName}] is public!`);
          }
        } catch (aclError) {
          // Ignore buckets where we can't get ACL (e.g. permissions)
        }
      }
    }

    const newScore = 100 - (publicBucketsCount * 10);

    await dynamoDbClient.send(new UpdateItemCommand({
      TableName: 'CloudSec360-Tenants',
      Key: { tenantId: { S: tenantId } },
      UpdateExpression: 'SET securityScore = :score, lastS3Audit = :auditTime',
      ExpressionAttributeValues: {
        ':score': { N: newScore.toString() },
        ':auditTime': { S: new Date().toISOString() },
      },
    }));

    console.log(`S3 audit complete for tenant ${tenantId}. New score: ${newScore}`);

  } catch (error) {
    console.error(`Failed to audit S3 buckets for tenant ${tenantId}:`, error);
  }
};
'''
