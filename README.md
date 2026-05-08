# CRM Pro — Lead Management System

Full-stack CRM application for sales teams to manage leads, track pipeline progress, add notes, and view analytics.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Framer Motion, Recharts, Lucide React |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB Atlas |
| Auth | JWT + bcryptjs |

## Features

- JWT authentication with protected routes
- Full lead CRUD with 6-stage pipeline (New → Contacted → Qualified → Proposal Sent → Won → Lost)
- Notes system per lead
- Dashboard with live stats and charts
- Filter by status, source, salesperson + search
- Pagination on leads and notes
- Responsive design (mobile, tablet, desktop)
- Collapsible sidebar with overlay on small screens
- Animated landing page

## Setup

### 1. Clone

```bash
git clone https://github.com/Hasmoonn/CRM_System.git
cd crm-project
2. Backend
Bash

cd crm-backend
npm install
Create crm-backend/.env:

env

PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
Demo .env used during development:


Bash

npm run server
Runs on http://localhost:4000

3. Seed Database
Bash

npm run seed
Creates 5 users + 24 leads across all pipeline stages.

4. Frontend
Bash

cd ../crm-frontend
npm install
Create crm-frontend/.env.local:

env

NEXT_PUBLIC_API_URL=http://localhost:4000/api
Start frontend:

Bash

npm run dev
Runs on http://localhost:3000

just register before logging in
Test Credentials
Role	Email	Password
Salesperson	your_mail@gmail.com	your_password

API Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/leads	Get leads (supports filters)
POST	/api/leads	Create lead
GET	/api/leads/:id	Get single lead
PUT	/api/leads/:id	Update lead
DELETE	/api/leads/:id	Delete lead
PATCH	/api/leads/:id/status	Update status
GET	/api/notes/:leadId	Get notes
POST	/api/notes/:leadId	Add note
DELETE	/api/notes/:noteId	Delete note
GET	/api/dashboard/stats	Dashboard data
Environment Variables
Backend — crm-backend/.env
env

PORT=4000                          # Server port
MONGODB_URI=mongodb+srv://...      # MongoDB connection string
JWT_SECRET=your_secret             # JWT signing key
JWT_EXPIRE=7d                      # Token expiry duration
CLIENT_URL=http://localhost:3000   # Frontend URL (CORS)
Frontend — crm-frontend/.env.local
env

NEXT_PUBLIC_API_URL=http://localhost:4000/api   # Backend API URL
Known Limitations
No role-based access control — all users see all leads
No email verification on registration
No real-time updates (needs manual refresh)
Not deployed — local only
Reflection
This project was built as a take-home intern assessment. The main challenge was creating a consistent, responsive UI using inline styles with Framer Motion while keeping the codebase maintainable. Implementing the sidebar context system — where the sidebar width controls both the sidebar animation and the content margin simultaneously — required careful state management with React context.

If given more time, I would add role-based permissions, a Kanban drag-and-drop view, WebSocket-based real-time updates, and CSV export functionality.

Demo Video
Demo Video Link — Loom / YouTube

Deployment
Not deployed. See setup instructions above to run locally.

Built by Hasmoon