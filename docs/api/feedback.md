# Feedback API

## Generate Voice Feedback
Generate AI voice feedback for a check-in using ElevenLabs.

### `POST /api/feedback`

#### Authentication
- Required: Yes
- Role: Coach or System

#### Request Body
```json
{
  "checkinId": "checkin_001",
  "summaryText": "You struggled this week but stayed consistent with your meals. Let's reset and push through next week!",
  "voiceType": "motivational"
}
```

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "feedbackId": "feedback_001",
    "checkinId": "checkin_001",
    "audioUrl": "https://firebase.storage/audio/xyz.mp3",
    "transcription": "You struggled this week but stayed consistent...",
    "duration": 15.5,
    "createdAt": "2024-05-14T10:05:00Z"
  }
}
```

## Get Feedback Settings
Retrieve voice feedback settings for a coach or client.

### `GET /api/feedback/settings`

#### Authentication
- Required: Yes
- Role: Coach or Client

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "voicePreferences": {
      "defaultVoice": "motivational",
      "language": "en-US",
      "speed": 1.0,
      "pitch": 1.0
    },
    "automationRules": {
      "generateOnCheckin": true,
      "delayMinutes": 5,
      "notifyClient": true
    }
  }
}
```

## Update Feedback Settings
Update voice feedback settings.

### `PATCH /api/feedback/settings`

#### Authentication
- Required: Yes
- Role: Coach only

#### Request Body
```json
{
  "voicePreferences": {
    "defaultVoice": "empathetic",
    "speed": 0.9
  },
  "automationRules": {
    "generateOnCheckin": true
  }
}
```

#### Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "updated": ["voicePreferences.defaultVoice", "voicePreferences.speed", "automationRules.generateOnCheckin"],
    "timestamp": "2024-05-14T10:00:00Z"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid feedback parameters",
  "errors": [
    {
      "field": "voiceType",
      "message": "Invalid voice type selected"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Not authorized to generate feedback"
}
```

### 429 Too Many Requests
```json
{
  "status": "error",
  "message": "AI generation rate limit exceeded",
  "retryAfter": 60
}
```

## Voice Types
Available voice types for feedback:
- `motivational` - Energetic and encouraging
- `empathetic` - Warm and understanding
- `professional` - Clear and direct
- `friendly` - Casual and supportive

## Notes
- Voice generation is limited to 20 requests per minute per coach
- Maximum text length for generation is 1000 characters
- Audio files are stored for 30 days
- Supported audio formats: MP3 (default), WAV
- Voice settings are inherited from coach settings for automated feedback 