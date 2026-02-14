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
// Best practices used here:
// - SDK clients initialized OUTSIDE the handler (reused across invocations, avoids cold start overhead)
// - Table name from environment variable with fallback (configure in Lambda > Configuration > Environment variables)
// - Event logging for debugging via CloudWatch
//
// Note: The AWS SDK is pre-installed in Lambda — no need to npm install anything.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Initialize clients outside the handler — they're reused across invocations
// This is an AWS best practice that reduces cold start time
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// Best practice: use an environment variable for the table name
// Fallback to the hardcoded value for workshop simplicity
const tableName = process.env.TABLE_NAME || "http-crud-tutorial-items";

export const handler = async (event, context) => {
  console.log("Event:", JSON.stringify(event));

  let body;
  let statusCode = 200;
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
      body = `Saved item ${item.id}`;
    } else {
      // If no body, list all items in the table
      const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
      body = result.Items;
    }
  } catch (err) {
    statusCode = 500;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return { statusCode, headers, body };
};
