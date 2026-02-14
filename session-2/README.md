# Session 2: API Gateway Setup

> No Lambda code changes in this session — we're connecting your Lambda function to the internet via API Gateway.

## What is API Gateway?

Right now your Lambda function exists but has no public URL — nobody can call it from the internet. **API Gateway** acts as a "front door" that:

- Gives your Lambda a public HTTPS URL
- Routes incoming HTTP requests (GET, PUT, DELETE, etc.) to your Lambda
- Handles things like CORS, throttling, and authorization (we won't need these today)

Think of it like a receptionist that receives requests and forwards them to the right department (your Lambda function).

## Steps

1. Open the **API Gateway** console (search "API Gateway" in the AWS search bar)
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
8. Copy the **Invoke URL** from the **Stages** page (it looks like `https://abc123.execute-api.ap-southeast-1.amazonaws.com`)

## Routes

| Method | Path | Integration | Description |
|--------|------|-------------|-------------|
| GET | `/hello` | `hello-serverless` | Calls your Hello World Lambda |

## Testing

Replace `YOUR-API-ID` with the ID from your Invoke URL:

**Option 1: Browser** — Just paste the URL into your browser's address bar:
```
https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/hello
https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/hello?name=YourName
```

**Option 2: curl** (from your terminal):
```bash
curl "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/hello"
curl "https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/hello?name=YourName"
```

## Expected Response

```json
{
  "message": "Hello, YourName! You just ran serverless code.",
  "timestamp": "2026-02-15T10:30:00.000Z",
  "cold": true
}
```

If you see this, your Lambda is now live on the internet!
