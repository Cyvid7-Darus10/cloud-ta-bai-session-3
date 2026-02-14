# Session 2: API Gateway Setup

> No Lambda code changes in this session — we're connecting our function to the internet via API Gateway.

## Steps

1. Open the **API Gateway** console
2. Click **Create API** → find **HTTP API** → click **Build**
3. Click **Add integration**:
   - Integration type: **Lambda**
   - Lambda function: `hello-serverless`
4. API name: `hello-api`
5. Click **Next**
6. Configure routes:
   - Method: `GET`
   - Resource path: `/hello`
   - Integration target: `hello-serverless`
7. Click **Next** → keep stage name as `$default` → **Next** → **Create**
8. Copy the **Invoke URL** from the Stages page

## Routes

| Method | Path | Integration |
|--------|------|-------------|
| GET | `/hello` | `hello-serverless` |

## Testing

Replace `YOUR-API-ID` with the ID from your Invoke URL:

```bash
# Basic request
curl "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/hello"

# With query parameter
curl "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/hello?name=YourName"
```

Or open the URL directly in your browser.
