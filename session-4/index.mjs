// Session 4: Full CRUD API
//
// This is the final version of our Lambda handler. It handles all 4 CRUD operations
// using a single function. API Gateway tells us which route was called via `event.routeKey`.
//
// Routes handled:
//   GET    /items       → List all items        (ScanCommand)
//   GET    /items/{id}  → Get one item by ID    (GetCommand)
//   PUT    /items       → Create/replace item   (PutCommand)
//   DELETE /items/{id}  → Delete item by ID     (DeleteCommand)
//
// How routing works:
//   API Gateway sets `event.routeKey` to a string like "GET /items/{id}".
//   We use a switch statement to run the right database operation for each route.
//
// Testing with curl (replace YOUR-API-ID with your actual API Gateway URL):
//
//   # Create an item
//   curl -X PUT "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/items" \
//     -H "Content-Type: application/json" \
//     -d '{"id": "1", "name": "Laptop", "price": 999}'
//
//   # List all items
//   curl "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/items"
//
//   # Get one item
//   curl "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/items/1"
//
//   # Delete an item
//   curl -X DELETE "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/items/1"

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
    // event.routeKey is set by API Gateway, e.g. "GET /items" or "DELETE /items/{id}"
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        // event.pathParameters.id contains the {id} from the URL
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
