# Goals API

## Create Goal
Create a new goal for a client.

### `POST /api/goals`

#### Authentication
- Required: Yes
- Role: Coach only

#### Request Body
```json
{
  "clientId": "abc123",
  "title": "Lose 5kg in 6 weeks",
  "category": "fitness",
  "startDate": "2024-05-01",
  "endDate": "2024-06-12",
  "questions": [
    "How did you eat this week?",
    "Did you complete your workouts?"
  ]
}
```

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "goalId": "goal_001",
    "clientId": "abc123",
    "title": "Lose 5kg in 6 weeks",
    "category": "fitness",
    "startDate": "2024-05-01",
    "endDate": "2024-06-12",
    "questions": [
      "How did you eat this week?",
      "Did you complete your workouts?"
    ],
    "createdAt": "2024-01-20T12:00:00Z",
    "status": "active"
  }
}
```

## Get Client Goals
Fetch all goals for a specific client.

### `GET /api/goals/:clientId`

#### Authentication
- Required: Yes
- Role: Coach or Client (must be associated with goals)

#### Parameters
- `clientId`: String (required) - The ID of the client

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "goals": [
      {
        "goalId": "goal_001",
        "title": "Lose 5kg in 6 weeks",
        "category": "fitness",
        "startDate": "2024-05-01",
        "endDate": "2024-06-12",
        "status": "active",
        "progress": {
          "completedCheckins": 2,
          "totalCheckins": 6,
          "lastCheckin": "2024-05-14T10:00:00Z"
        }
      }
    ]
  }
}
```

## Update Goal Status
Update the status of an existing goal.

### `PATCH /api/goals/:goalId`

#### Authentication
- Required: Yes
- Role: Coach only

#### Request Body
```json
{
  "status": "completed",
  "notes": "Client achieved target weight"
}
```

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "goalId": "goal_001",
    "status": "completed",
    "updatedAt": "2024-06-12T12:00:00Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid goal parameters",
  "errors": [
    {
      "field": "endDate",
      "message": "End date must be after start date"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Not authorized to manage goals for this client"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Goal not found"
}
```

## Notes
- Goals can only be created by coaches
- Clients can only view their own goals
- Goal dates must be in ISO 8601 format
- Maximum of 10 questions per goal 