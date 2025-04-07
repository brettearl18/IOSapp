# API Endpoint Name

## Overview
Brief description of what the endpoint does and when to use it.

## Endpoint

```
METHOD /api/path
```

## Authentication
Describe authentication requirements:
- Required headers
- Token format
- Permissions needed

## Request

### Headers
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `param1` | `string` | Yes | - | Description of param1 |
| `param2` | `object` | No | `{}` | Description of param2 |

### Example Request Body
```json
{
  "param1": "value",
  "param2": {
    "key": "value"
  }
}
```

## Response

### Success Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "id": "123",
    "name": "Example"
  }
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid parameters",
  "errors": [
    {
      "field": "param1",
      "message": "Field is required"
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Invalid or expired token"
}
```

## Rate Limiting
Describe any rate limiting policies:
- Requests per minute
- Cooldown periods
- Quota limits

## Examples

### cURL
```bash
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"param1": "value"}' \
  https://api.accountablecoach.app/endpoint
```

### TypeScript
```typescript
import { api } from '@/utils/api';

const response = await api.post('/endpoint', {
  param1: 'value'
});
```

## Notes
Any additional information, edge cases, or known limitations. 