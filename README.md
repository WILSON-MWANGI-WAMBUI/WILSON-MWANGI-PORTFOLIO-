# Wilson Mwangi Portfolio

A personal portfolio site showcasing **Wilson Mwangi Wambui** — Problem Solver, Javascript Engineer, and Software Engineering professional. Built with React, Vite, and Tailwind CSS on the frontend, and Express + Nodemailer on the backend for contact form email delivery.

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
| Backend   | Express, Nodemailer  | Render   |

The frontend calls the backend API for the contact form. Emails are sent via Gmail SMTP using Nodemailer.

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
| `SMTP_USER`        | Gmail address used to send emails                  | `mwangiwilson137@gmail.com`                        |
| `SMTP_PASS`        | Gmail App Password (not your regular Gmail password)| *(16-character App Password)*                     |
| `RECEIVER_EMAIL`   | Where contact form messages are delivered          | `mwangiwilson137@gmail.com`                        |

#### Gmail App Password

1. Go to [Google Account → Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if needed
3. Under **2-Step Verification**, go to **App passwords**
4. Create an app password for **Mail** / **Other (Custom name)** → e.g. "Portfolio"
5. Use the 16-character password as `SMTP_PASS`

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
