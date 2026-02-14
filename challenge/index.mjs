// Challenge Solution: PATCH /items/{id}
//
// This extends the Session 4 handler with a PATCH endpoint that updates
// only the price of an existing item — without replacing the entire item.
//
// Why PATCH instead of PUT?
//   - PUT replaces the entire item (you must send all fields)
//   - PATCH updates only the fields you send (partial update)
//
// New concept — UpdateCommand:
//   Instead of replacing the whole item (PutCommand), UpdateCommand lets you
//   modify specific attributes using an UpdateExpression.
//
//   UpdateExpression: "SET price = :p"
//     → This tells DynamoDB: "set the price attribute to the value of :p"
//
//   ExpressionAttributeValues: { ":p": patchBody.price }
//     → This defines what :p actually is (the new price from the request body)
//
//   ReturnValues: "ALL_NEW"
//     → This tells DynamoDB to return the full item after the update
//
// To add this route in API Gateway:
//   Method: PATCH, Path: /items/{id}, Integration: hello-serverless
//
// Test with curl:
//   curl -X PATCH "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/items/1" \
//     -H "Content-Type: application/json" \
//     -d '{"price": 799}'

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME || "http-crud-tutorial-items";

export const handler = async (event, context) => {
  console.log("Event:", JSON.stringify(event));

  let body;
  let statusCode = 200;
  const headers = { "Content-Type": "application/json" };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: { id: event.pathParameters.id },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      case "GET /items/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: { id: event.pathParameters.id },
          })
        );
        body = body.Item;
        break;

      case "GET /items":
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        body = body.Items;
        break;

      case "PUT /items":
        const requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name,
            },
          })
        );
        body = `Put item ${requestJSON.id}`;
        break;

      // --- Challenge: PATCH /items/{id} — Update only the price ---
      case "PATCH /items/{id}":
        const patchBody = JSON.parse(event.body);
        const updateResult = await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            Key: { id: event.pathParameters.id },
            UpdateExpression: "SET price = :p",            // only update the price field
            ExpressionAttributeValues: { ":p": patchBody.price }, // bind :p to the new price
            ReturnValues: "ALL_NEW",                       // return the full updated item
          })
        );
        body = updateResult.Attributes;
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return { statusCode, body, headers };
};
