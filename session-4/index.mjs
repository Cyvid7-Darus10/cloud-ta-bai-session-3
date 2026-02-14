import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "http-crud-tutorial-items";

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = { "Content-Type": "application/json" };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo.send(new DeleteCommand({
          TableName: tableName,
          Key: { id: event.pathParameters.id },
        }));
        body = { message: `Deleted item ${event.pathParameters.id}` };
        break;

      case "GET /items/{id}":
        const getResult = await dynamo.send(new GetCommand({
          TableName: tableName,
          Key: { id: event.pathParameters.id },
        }));
        body = getResult.Item || { message: "Item not found" };
        break;

      case "GET /items":
        const scanResult = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = scanResult.Items;
        break;

      case "PUT /items":
        const requestJSON = JSON.parse(event.body);
        await dynamo.send(new PutCommand({
          TableName: tableName,
          Item: {
            id: requestJSON.id,
            price: requestJSON.price,
            name: requestJSON.name,
          },
        }));
        body = { message: `Saved item ${requestJSON.id}` };
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = { error: err.message };
  }

  return { statusCode, body: JSON.stringify(body), headers };
};
