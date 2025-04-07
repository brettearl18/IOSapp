# AccountableCoach – Automated Client Accountability Platform

## Overview

**AccountableCoach** is a fully automated, AI-powered accountability app designed for health and fitness coaches. The platform allows coaches to manage their clients' progress, assign personalised goals, and deliver weekly check-ins. Clients receive dynamic prompts and AI-generated voice feedback to stay on track.

The system uses **Firebase** for backend infrastructure, **ElevenLabs** for voice feedback, and optional **OpenAI** for summarising client responses. This is a tiered SaaS platform with scalable pricing for coaches and teams of all sizes.

---

## Tech Stack

| Layer         | Technology            |
|---------------|------------------------|
| Frontend      | React / React Native   |
| Backend       | Firebase (Auth, Firestore, Functions) |
| APIs          | ElevenLabs (Voice), OpenAI (Optional) |
| Hosting       | Firebase Hosting / Vercel |
| Auth          | Firebase Auth          |
| Payments      | Stripe (Tiered Coach Plans) |
| Notifications | Firebase Cloud Messaging |

---

## User Roles

### 1. **Coach**
- Invite and manage clients
- Assign goals
- Review check-ins
- View client progress
- Trigger or customise AI voice feedback

### 2. **Client**
- Set or accept goals
- Complete weekly check-ins (traffic light + notes)
- Receive AI-generated voice summaries
- Track streaks and progress

---

## Key Features

- **Weekly Check-Ins**: Dynamic, goal-based prompts clients fill in every 7 days
- **Voice Feedback**: ElevenLabs-powered personalised replies after check-ins
- **Goal Tracking**: Create, edit, complete, and review goals over time
- **Coach Dashboard**: Overview of all clients and their accountability status
- **Tiered Billing**: Subscription plans for solo coaches, growing teams, and enterprises
- **Custom Templates**: Coaches can create reusable question packs for check-ins

---

## File Structure (Core)

```
/src
  /components
  /pages
  /hooks
  /utils
/firebase
  /functions
  /triggers
/public
README.md
.env
```

---

## APIs Used

- **ElevenLabs API**
  - Input: Summary text + voice type
  - Output: MP3/Audio URL
- **OpenAI API** (Optional)
  - Input: Weekly check-in answers
  - Output: Short-form summary for voice reply

---

## Build Phases

### ✅ Phase 1 – MVP
- Auth (Coach + Client)
- Goal creation
- Weekly check-in system
- ElevenLabs voice integration
- Coach dashboard (basic)
- Stripe billing

### 🔜 Phase 2
- Coach branding & white label
- Analytics dashboard
- Group coaching support
- Web & mobile sync
- Habit tracking integrations (Apple Health, Google Fit)

---

## Contributing

Please fork the repo and submit PRs to the `dev` branch. Use conventional commits and maintain component reusability.

---

## License

MIT License

---

## Contact

Project by: [Brett & Team]  
Contact: `hello@accountablecoach.app` 