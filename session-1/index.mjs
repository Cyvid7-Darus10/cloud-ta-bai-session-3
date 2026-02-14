// Session 1: Hello World Lambda
//
// This is your first Lambda function! Lambda runs your code in the cloud
// without needing to manage any servers.
//
// How it works:
// - AWS calls your `handler` function whenever someone triggers this Lambda
// - The `event` object contains info about the request (query params, headers, body, etc.)
// - You return an object with `statusCode` and `body` — Lambda sends this back as an HTTP response
//
// Try it: After deploying, test with ?name=YourName in the query string

export const handler = async (event) => {
  // Read the "name" query parameter, or default to "World"
  // Example: /hello?name=Cyrus → name = "Cyrus"
  const name = event.queryStringParameters?.name || "World";

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}! You just ran serverless code.`,
      timestamp: new Date().toISOString(),
      cold: !global.__warm,
    }),
  };

  // Mark as warm for next invocation
  global.__warm = true;
};
