export const handler = async (event) => {
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
