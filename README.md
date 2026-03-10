# Wilson Mwangi Portfolio

## Architecture

- **Frontend**: React + Vite (deploy to Vercel)
- **Backend**: Express + Nodemailer (deploy to Render)

## Environment variables

### Frontend (Vercel + local)

Create a `.env` in the project root (see `.env.example`):

- **`VITE_API_URL`**: Your Render backend base URL  
  Example: `https://portfolio-backend-qmoo.onrender.com`

### Backend (Render)

Set these in Render (see `backend/.env.example`):

- **`FRONTEND_ORIGIN`**: `https://wilson-mwangi-portfolio-2y5b.vercel.app`
- **`SMTP_USER`** / **`SMTP_PASS`**: Gmail + App Password
- **`RECEIVER_EMAIL`**: where contact messages should be delivered

## Local development

Install dependencies:

```bash
npm install
cd backend && npm install
```

Run both frontend and backend together:

```bash
npm run dev
```

Backend health check:

- `GET /health` should return `{ "ok": true }`
