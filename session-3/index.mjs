import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "http-crud-tutorial-items";

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  try {
    // If there's a body, save the item
    if (event.body) {
      const item = JSON.parse(event.body);
      await dynamo.send(new PutCommand({
        TableName: tableName,
        Item: { id: item.id, name: item.name, price: item.price },
      }));
      return { statusCode: 200, headers, body: JSON.stringify({ message: `Saved item ${item.id}` }) };
    }

    // Otherwise, list all items
    const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
    return { statusCode: 200, headers, body: JSON.stringify(result.Items) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
