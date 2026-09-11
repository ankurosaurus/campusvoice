# CampusVoice — Closed-Loop Feedback-to-Resolution Platform

**CampusVoice** is a full-stack, real-time, responsive web application engineered to bridge the gap between student feedback and actual service improvement in hostel living and mess/dining operations across large residential campuses (e.g. Lovely Professional University - LPU).

---

## Key Features

1. **Authentication & Role-Based Access Control**:
   - **Student Signup**: Restricted to official college email domains (`@lpu.in` or `@lpu.edu.in`).
   - **Hostel Warden & Staff Login**: Block-specific access (`BH-1`, `BH-2`, `GH-1`, `Mess Alpha`).
   - **Admin Login**: Central campus control and gap visualizer access.
   - **Demo Quick-Login Bar**: Integrated 1-click presets for instant evaluation.

2. **Student Portal**:
   - **Hostel Complaints**: Categories include electricity, plumbing, cleanliness, wifi, furniture, security, and other. Supports urgency selection and Base64 photo uploads with preview.
   - **Mess & Dining Feedback**: Per-meal rating (1-5 stars) across food quality, hygiene, variety, quantity, and staff behavior.
   - **Weekly Mess Menu**: Interactive daily menu viewer with live dish rating.
   - **Closed-Loop Verification**: Students rate ticket resolution (Satisfied vs Unsatisfied). Selecting **Not Satisfied** automatically reopens the ticket, resets status to `Reopened`, increments reopened count, and notifies wardens.

3. **Warden / Staff Dashboard**:
   - Assigned ticket streams for specific hostel blocks or mess units.
   - Filters by category, urgency, status, and SLA breach condition.
   - Status updates with **mandatory action-taken remarks**.
   - SLA tracking (24h acknowledgment and 72h resolution deadline windows).

4. **Admin Dashboard (Core "Gap" Visualizer)**:
   - **Campus Gap Score**: Calculated as `Gap Score = 100 - (SLA Compliance % * (1 - Reopen Rate %))` to measure operational accountability.
   - **Leaderboard**: Best/worst performing hostel blocks and staff by resolution speed and student satisfaction score.
   - **Category Heatmap & Trend Charts**: Built with Recharts for visual inspection of recurring problem areas over time.
   - **Exportable Reports**: Downloadable CSV report containing full complaint lifecycles.

5. **Public Transparency Layer**:
   - Live public trust dashboard showing real-time block-wise resolution rates, average response speeds, and an anonymized stream of recent resolutions.

---

## Tech Stack

- **Frontend**: React 18 (Vite), Tailwind CSS (Vesper.ai dark liquid-metal design system), Recharts, Socket.io-client, Lucide Icons
- **Backend**: Node.js, Express.js REST API, Socket.io
- **Database**: MongoDB via Mongoose (with automated zero-config fallback to `mongodb-memory-server`)

---

## Quick Start & Installation

### 1. Install Dependencies
Run from project root:
```bash
npm run install-all
```
*(This installs dependencies for root, server, and client concurrently)*

### 2. Seed Database
Populate database with 20+ students, 3 hostel blocks, 1 mess unit, weekly menu, and 50+ realistic sample complaints:
```bash
npm run seed
```

### 3. Run Development Server
Launch both Express backend (`http://localhost:5000`) and Vite React frontend (`http://localhost:3000`) simultaneously:
```bash
npm run dev
```

---

## Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@lpu.in` | `password123` |
| **Warden BH-1** | `warden.bh1@lpu.in` | `password123` |
| **Warden BH-2** | `warden.bh2@lpu.in` | `password123` |
| **Warden GH-1** | `warden.gh1@lpu.in` | `password123` |
| **Mess Manager** | `mess.alpha@lpu.in` | `password123` |
| **Student** | `student1@lpu.in` | `password123` |
