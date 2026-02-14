# Cloud Ta Bai Session 3: Flying Light

> **Serverless CRUD API Workshop** — Build a CRUD API with AWS Lambda, API Gateway, and DynamoDB.

## Architecture

```
You (browser / curl)  →  API Gateway  →  Lambda  →  DynamoDB
```

## Prerequisites

- [ ] AWS Account (free tier is fine)
- [ ] A modern web browser
- [ ] (Optional) Terminal with `curl` installed

## Workshop Sessions

| Session | Topic | Folder |
|---------|-------|--------|
| 1 | Hello World Lambda | [`session-1/`](./session-1/) |
| 2 | API Gateway Setup | [`session-2/`](./session-2/) |
| 3 | DynamoDB Read & Write | [`session-3/`](./session-3/) |
| 4 | Full CRUD API | [`session-4/`](./session-4/) |
| Challenge | PATCH Endpoint | [`challenge/`](./challenge/) |

## Key AWS Resources

| Resource | Name |
|----------|------|
| Lambda Function | `hello-serverless` |
| DynamoDB Table | `http-crud-tutorial-items` (Partition key: `id`, String) |
| API Gateway | `hello-api` (HTTP API) |
| Runtime | Node.js 20.x |
| Region | `ap-southeast-1` (Singapore) |

## Workshop Guide

Follow the full step-by-step guide on Notion:
**[Cloud Ta Bai Session 3 — Workshop Guide](https://cyvid7.notion.site/Cloud-Ta-Bai-Session-3-Flying-Light-209f1cdcedf680ac88b0da5f5ba70e23)**

## Clean-Up Instructions

After the workshop, delete these resources to avoid charges:

1. **API Gateway** — Go to API Gateway console → Select `hello-api` → Actions → Delete
2. **Lambda Function** — Go to Lambda console → Select `hello-serverless` → Actions → Delete function
3. **DynamoDB Table** — Go to DynamoDB console → Tables → Select `http-crud-tutorial-items` → Delete table
4. **CloudWatch Logs** — Go to CloudWatch → Log groups → Delete `/aws/lambda/hello-serverless`

## Resources & Further Reading

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
