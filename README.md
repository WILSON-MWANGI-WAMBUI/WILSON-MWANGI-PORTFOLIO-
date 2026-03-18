# Wilson Mwangi Portfolio

A personal portfolio site showcasing **Wilson Mwangi Wambui** — Problem Solver, Javascript Engineer, and Software Engineering professional. Built with React, Vite, and Tailwind CSS on the frontend, and Express + SendGrid on the backend for contact form email delivery.

## Project Overview

This portfolio presents:

- **Home** — Introduction with a simulated code editor showing skills (React, NextJS, TypeScript, Node, MongoDB, etc.) and profile
- **Skills** — Technical stack and capabilities
- **Experience** — Professional work history
- **Education** — Academic background
- **Projects** — Featured work with links to live demos and GitHub
- **Contact** — Form that sends messages to your inbox via the backend API

## Architecture

| Layer     | Stack              | Hosting    |
| --------- | ------------------ | ---------- |
| Frontend  | React, Vite, Tailwind | Vercel   |
| Backend   | Express, SendGrid  | Render   |

The frontend calls the backend API for the contact form. Emails are sent via SendGrid's API.

## Environment Variables

### Frontend (Vercel + local)

Create a `.env` in the project root:

| Variable        | Description                          | Example                                      |
| --------------- | ------------------------------------ | -------------------------------------------- |
| `VITE_API_URL`  | Backend base URL for the contact API | `https://portfolio-backend-qmoo.onrender.com` |

### Backend (Render)

Set these in your Render service **Environment** tab:

| Variable           | Description                                        | Example                                            |
| ------------------ | -------------------------------------------------- | -------------------------------------------------- |
| `FRONTEND_ORIGIN`  | Allowed CORS origin (your Vercel URL)              | `https://wilson-mwangi-portfolio-2y5b.vercel.app`  |
| `SENDGRID_API_KEY` | SendGrid API key (keep secret)                     | *(set in Render; never commit)*                    |
| `SENDER_EMAIL`     | Verified sender email in SendGrid                  | `mwangiwilson137@gmail.com`                        |
| `RECEIVER_EMAIL`   | Where contact form messages are delivered          | `mwangiwilson137@gmail.com`                        |

If these are set correctly on Render, every submitted contact message will be delivered to `RECEIVER_EMAIL`.

## Local Development

```bash
npm install
cd backend && npm install
```

From the project root:

```bash
npm run dev
```

This starts the frontend (Vite) and backend (Express) together.

### Health Check

- `GET /` → `{ "status": "API running" }`
- `GET /health` → `{ "ok": true }`

## API

| Method | Endpoint       | Body                                      | Description        |
| ------ | ----------------- | ----------------------------------------- | ------------------ |
| POST   | `/api/contact`  | `{ name, email, subject, message }`       | Sends contact form |

Validation:

- `name`, `email`, `subject`, `message` are required
- `email` must be valid
- `message` must be at least 10 characters

## License

MIT
