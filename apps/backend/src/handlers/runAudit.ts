'''
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({});
const AUDIT_QUEUE_URL = `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/CloudSec360-AuditQueue`;

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const tenantId = event.pathParameters?.tenantId;
  const body = event.body ? JSON.parse(event.body) : {};
  const framework = body.framework || 'LGPD';

  if (!tenantId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error: tenantId is required.' }),
    };
  }

  try {
    const command = new SendMessageCommand({
      QueueUrl: AUDIT_QUEUE_URL,
      MessageBody: JSON.stringify({
        tenantId,
        framework,
        startTime: new Date().toISOString(),
      }),
    });

    await sqsClient.send(command);

    return {
      statusCode: 202,
      body: JSON.stringify({
        message: `Audit for framework [${framework}] has been queued for tenant [${tenantId}].`,
      }),
    };
  } catch (error) {
    console.error('Failed to queue audit task:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error while queuing audit.' }),
    };
  }
};
'''
