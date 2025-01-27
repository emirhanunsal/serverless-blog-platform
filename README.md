# Static Blog Platform

This is a blog platform I built to learn the basics of serverless architecture using AWS services. The primary goal of this project was to deepen my understanding of integrating AWS S3, DynamoDB, API Gateway, and Lambda in a real-world application. It helped me practice backend and serverless concepts while building a functional and responsive blog platform.

---

## 🚀 Features

- **Dynamic Blog Content**: Blog posts are dynamically fetched from a backend API.
- **Serverless Architecture**: Backend is powered by AWS services for scalability and cost-efficiency.

---

## 🛠️ Technologies Used

### Backend
- **AWS S3**: Used for hosting the static frontend files, ensuring high availability and fast performance.
- **AWS API Gateway**: Acts as the API layer to expose backend data securely.
- **AWS DynamoDB**: NoSQL database for storing blog posts with high scalability.
- **AWS Lambda**: Processes API requests, retrieves data from DynamoDB, and formats it for the frontend.

---

## 🖥️ Backend Architecture

### DynamoDB Table Structure
The blog posts are stored in a DynamoDB table named `BlogPosts` with the following schema:
- **Partition Key**: `postId` (String) – A unique identifier for each blog post.
- **Attributes**:
  - `author` (String) – Author of the blog post.
  - `title` (String) – Title of the blog post.
  - `date` (String) – Date of publication.
  - `content` (JSON) – Content of the blog post stored as a JSON string.

#### Example DynamoDB Entry:
```json
{
  "postId": { "S": "1" },
  "author": { "S": "Ali" },
  "title": { "S": "Dynamic Blog Development" },
  "date": { "S": "2024-12-27" },
  "content": { "S": "[{\"type\": \"h1\", \"text\": \"Dynamic Blog\"}, {\"type\": \"p\", \"text\": \"This is a dynamic blog post.\"}]" }
}
```
#### AWS Lambda Function
The following Python Lambda function retrieves data from the DynamoDB table and returns it as a JSON response:

```python
import boto3
import json

def lambda_handler(event, context):
    # Connect to DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('BlogPosts')  # Correct syntax for table reference

    # Scan all items
    response = table.scan()

    # Log response for debugging purposes
    print("DynamoDB Response:", response)

    # Return items if available
    items = response.get('Items', [])
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': json.dumps(items)
    }
```
---
## 📦 Deployment

#### AWS S3 Hosting:
- All static files (HTML, CSS, JavaScript) are hosted on an AWS S3 bucket with public access enabled for static website hosting.
The S3 bucket ensures high availability and fast delivery of static content.

#### Backend Services:
- The backend is powered by AWS API Gateway, DynamoDB, and Lambda to handle data retrieval and processing.
