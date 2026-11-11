# Payslip Generator Application (MERN)

A complete exam-ready MERN application that lets an HR/Admin create employee payslips, preview them, download them as PDF files, and view previously generated payslips.

## Requirements
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

## Project structure
```text
payslip-generator/
├── server/                 # Express + MongoDB API
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
└── client/                 # React + Vite frontend
    ├── src/
    ├── index.html
    └── package.json
```

## 1. Start the backend (terminal 1)
```bash
cd server
npm install
```

Copy `.env.example` to `.env` and update the MongoDB URI if needed:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/payslip_generator
```

Then run:
```bash
npm run dev
```
Backend: `http://localhost:5000`

## 2. Start the frontend (terminal 2)
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Frontend: `http://localhost:5173`

**Run the server and client separately.** Do not run commands from the project root.

## Features
- Create and store employee payslips.
- Fetch and display all saved payslips.
- Automatically calculate `netSalary = basicSalary + hra - deductions`.
- Show a payslip preview before saving.
- Download the selected payslip as a PDF using jsPDF.
- Responsive layout and basic form validation.

## API endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/payslips` | Get all payslips |
| POST | `/api/payslips` | Create a payslip |
| GET | `/api/payslips/:id` | Get one payslip |

## Notes
- The backend recalculates `netSalary` before saving, so the stored amount is not dependent on the frontend.
- If MongoDB is not running, start MongoDB or use an Atlas URI in `server/.env`.
