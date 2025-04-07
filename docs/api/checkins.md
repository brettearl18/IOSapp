# Check-ins API

## Submit Check-in
Submit a weekly check-in for a goal.

### `POST /api/checkins`

#### Authentication
- Required: Yes
- Role: Client only

#### Request Body
```json
{
  "goalId": "goal_001",
  "responses": {
    "q1": "green",
    "q2": "red",
    "mood": "neutral",
    "notes": "Missed some sessions but eating was good"
  }
}
```

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "checkinId": "checkin_001",
    "goalId": "goal_001",
    "clientId": "abc123",
    "timestamp": "2024-05-14T10:00:00Z",
    "responses": {
      "q1": "green",
      "q2": "red",
      "mood": "neutral",
      "notes": "Missed some sessions but eating was good"
    },
    "feedback": {
      "status": "pending",
      "estimatedDelivery": "2024-05-14T10:05:00Z"
    }
  }
}
```

## Get Check-in History
Fetch check-in history for a specific goal.

### `GET /api/checkins/:goalId`

#### Authentication
- Required: Yes
- Role: Coach or Client (associated with goal)

#### Parameters
- `goalId`: String (required) - The ID of the goal
- `limit`: Number (optional) - Number of check-ins to return (default: 10)
- `before`: String (optional) - Timestamp to fetch check-ins before

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "checkins": [
      {
        "checkinId": "checkin_001",
        "timestamp": "2024-05-14T10:00:00Z",
        "responses": {
          "q1": "green",
          "q2": "red",
          "mood": "neutral",
          "notes": "Missed some sessions but eating was good"
        },
        "feedback": {
          "status": "completed",
          "audioUrl": "https://firebase.storage/audio/xyz.mp3"
        }
      }
    ],
    "pagination": {
      "hasMore": true,
      "lastTimestamp": "2024-05-14T10:00:00Z"
    }
  }
}
```

## Get Single Check-in
Fetch details of a specific check-in.

### `GET /api/checkins/:goalId/:checkinId`

#### Authentication
- Required: Yes
- Role: Coach or Client (associated with goal)

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "checkinId": "checkin_001",
    "goalId": "goal_001",
    "clientId": "abc123",
    "timestamp": "2024-05-14T10:00:00Z",
    "responses": {
      "q1": "green",
      "q2": "red",
      "mood": "neutral",
      "notes": "Missed some sessions but eating was good"
    },
    "feedback": {
      "status": "completed",
      "audioUrl": "https://firebase.storage/audio/xyz.mp3",
      "transcription": "Great job on maintaining your diet..."
    }
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid check-in data",
  "errors": [
    {
      "field": "responses.q1",
      "message": "Response must be green, yellow, or red"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Not authorized to view this check-in"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Check-in not found"
}
```

## Notes
- Check-ins can only be submitted once per week per goal
- Response values for questions must be: "green", "yellow", or "red"
- Mood values must be: "positive", "neutral", or "negative"
- Notes are optional but limited to 500 characters
- AI feedback generation is automatically triggered on submission 