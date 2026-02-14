// Session 3: DynamoDB Read & Write
//
// In this session we connect our Lambda to a DynamoDB table so we can
// save items and list them back. This is our first taste of persistence!
//
// Two operations:
//   - PutCommand  → saves an item to the table (Create)
//   - ScanCommand → retrieves ALL items from the table (Read)
//
// We use the DynamoDB Document Client (from @aws-sdk/lib-dynamodb) which
// lets us work with plain JavaScript objects instead of DynamoDB's raw
// attribute format. For example, you can write { price: 999 } instead of
// { price: { N: "999" } }.
//
// Note: The AWS SDK is pre-installed in Lambda — no need to npm install anything.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Create the DynamoDB Document Client
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// This must match the table name you created in the DynamoDB console
const tableName = "http-crud-tutorial-items";

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  try {
    // If the request has a body, treat it as a "save item" request
    // Example body: { "id": "1", "name": "Laptop", "price": 999 }
    if (event.body) {
      const item = JSON.parse(event.body);
      await dynamo.send(new PutCommand({
        TableName: tableName,
        Item: { id: item.id, name: item.name, price: item.price },
      }));
      return { statusCode: 200, headers, body: JSON.stringify({ message: `Saved item ${item.id}` }) };
    }

    // If no body, list all items in the table
    const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
    return { statusCode: 200, headers, body: JSON.stringify(result.Items) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
