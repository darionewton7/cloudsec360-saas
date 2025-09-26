'''
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const tenantId = event.pathParameters?.tenantId;

  if (!tenantId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error: tenantId is required.' }),
    };
  }

  const command = new GetItemCommand({
    TableName: 'CloudSec360-Tenants',
    Key: {
      tenantId: { S: tenantId },
    },
  });

  try {
    const { Item } = await client.send(command);

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Tenant not found.' }),
      };
    }

    const securityData = {
      tenantId: Item.tenantId.S,
      score: Item.securityScore?.N ? parseInt(Item.securityScore.N, 10) : 0,
      lastAudit: Item.lastAudit?.S,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(securityData),
    };
  } catch (error) {
    console.error('DynamoDB error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error.' }),
    };
  }
};
'''
