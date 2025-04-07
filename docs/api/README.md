# API Documentation – AccountableCoach

## Overview
This document outlines the key API routes and endpoints used in the AccountableCoach app, including client check-ins, goal management, and AI integrations.

## Authentication
All endpoints require authentication using Firebase Auth (Bearer token in headers).

### Headers Example
```
Authorization: Bearer <user_token>
Content-Type: application/json
```

## Available Endpoints

- [Goals API](./goals.md)
  - Create goals
  - Fetch client goals
  - Update goal status

- [Check-ins API](./checkins.md)
  - Submit weekly check-ins
  - Fetch check-in history
  - Generate AI feedback

- [Feedback API](./feedback.md)
  - Generate voice feedback
  - Manage voice preferences

- [Webhooks](./webhooks.md)
  - Stripe subscription handling
  - External service integrations

## Response Format
All API responses follow a standard format:

### Success Response
```json
{
  "status": "success",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## Rate Limiting
- Standard endpoints: 100 requests per minute
- AI generation endpoints: 20 requests per minute
- Webhook endpoints: 1000 requests per minute

## Notes
- All responses include standard status codes (200, 400, 401, 500)
- Rate limiting may be applied to AI generation endpoints
- ElevenLabs and OpenAI are external services with timeout safeguards 