# Cloud Ta Bai Session 3: Flying Light

> **Serverless CRUD API Workshop** — Build a CRUD API with AWS Lambda, API Gateway, and DynamoDB.

## What You'll Build

By the end of this workshop, you'll have a fully working **REST API** that can **C**reate, **R**ead, **U**pdate, and **D**elete items — all running serverless on AWS (no servers to manage!).

```
┌──────────────┐       ┌───────────────┐       ┌──────────┐       ┌───────────┐
│  You         │       │  API Gateway  │       │  Lambda  │       │ DynamoDB  │
│  (browser /  │──────▶│  (HTTP API    │──────▶│  (your   │──────▶│ (NoSQL    │
│   curl)      │◀──────│   router)     │◀──────│   code)  │◀──────│  database)│
└──────────────┘       └───────────────┘       └──────────┘       └───────────┘
```

**In plain English:**
- **API Gateway** receives your HTTP request and routes it to the right Lambda function
- **Lambda** runs your JavaScript code on-demand (you only pay when it runs)
- **DynamoDB** stores your data in a fast, scalable NoSQL database

## Prerequisites

- [ ] AWS Account ([sign up here](https://aws.amazon.com/free/) — free tier is enough)
- [ ] A modern web browser (Chrome, Firefox, Edge, etc.)
- [ ] (Optional) Terminal with `curl` for testing API endpoints

> **No local setup required!** All code runs in the AWS Console. You don't need Node.js, npm, or any IDE on your machine.

## How to Use This Repo

Each folder contains the **correct, working code** for that session. Use it to:

- **Follow along** — Copy-paste the code if you fall behind during the workshop
- **Compare your work** — Check your code against the reference if something isn't working
- **Review later** — Come back after the workshop to study how each piece works

## Workshop Sessions

| Session | What You'll Do | Code |
|---------|---------------|------|
| **1** | Create your first Lambda function (Hello World) | [`session-1/index.mjs`](./session-1/index.mjs) |
| **2** | Connect Lambda to the internet via API Gateway | [`session-2/README.md`](./session-2/README.md) (config steps, no code changes) |
| **3** | Add a DynamoDB database — save and list items | [`session-3/index.mjs`](./session-3/index.mjs) |
| **4** | Build the full CRUD API (Create, Read, Delete) | [`session-4/index.mjs`](./session-4/index.mjs) |
| **Challenge** | Add a PATCH endpoint to update item prices | [`challenge/index.mjs`](./challenge/index.mjs) |

## API Endpoints (Final)

Once you finish Session 4, your API will support these routes:

| Method | Path | Description | Example Body |
|--------|------|-------------|--------------|
| `GET` | `/items` | List all items | — |
| `GET` | `/items/{id}` | Get a single item by ID | — |
| `PUT` | `/items` | Create or replace an item | `{"id": "1", "name": "Laptop", "price": 999}` |
| `DELETE` | `/items/{id}` | Delete an item by ID | — |
| `PATCH` | `/items/{id}` | Update an item's price (challenge) | `{"price": 799}` |

## Key AWS Resources

These are the names used throughout the workshop. Use these exact names to follow along:

| Resource | Name | What It Is |
|----------|------|------------|
| Lambda Function | `hello-serverless` | Your serverless function that runs the code |
| DynamoDB Table | `http-crud-tutorial-items` | Database table (partition key: `id`, type: String) |
| API Gateway | `hello-api` | HTTP API that routes requests to your Lambda |
| Runtime | Node.js 20.x | JavaScript runtime for Lambda |
| Region | `ap-southeast-1` (Singapore) | AWS datacenter closest to the Philippines |

## Workshop Guide

Follow the full step-by-step guide on Notion:

**[Cloud Ta Bai Session 3 — Workshop Guide](https://cyvid7.notion.site/Cloud-Ta-Bai-Session-3-Flying-Light-209f1cdcedf680ac88b0da5f5ba70e23)**

## Clean-Up Instructions

**Important:** Delete these resources after the workshop to avoid unexpected charges.

Go to the AWS Console in the `ap-southeast-1` (Singapore) region and delete in this order:

1. **API Gateway** — API Gateway console → Select `hello-api` → Actions → Delete
2. **Lambda Function** — Lambda console → Select `hello-serverless` → Actions → Delete function
3. **DynamoDB Table** — DynamoDB console → Tables → Select `http-crud-tutorial-items` → Delete table
4. **CloudWatch Logs** — CloudWatch console → Log groups → Delete `/aws/lambda/hello-serverless`

## Resources & Further Reading

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [AWS Free Tier](https://aws.amazon.com/free/)
