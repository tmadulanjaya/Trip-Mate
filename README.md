# TripMate

TripMate is a collaborative travel-planning application that lets a group plan trips together — itineraries, packing lists, expenses, polls, and comments, all in one shared space.

## Current status (Assignment 02)

This submission includes:
- A React frontend (multiple pages: Dashboard, Create Trip, Trip Details, Login, Register)
- An Express backend REST API with mock (in-memory) data
- JWT-based authentication (register/login)
- Frontend pages connected to the backend for trips and auth

Note: data is currently stored in memory on the server, so it resets whenever the backend is restarted. A real database (MongoDB) will be added in a later milestone.

## Technology used so far

- React (Vite)
- React Router
- Axios
- Node.js
- Express
- CORS
- JSON Web Tokens (jsonwebtoken)

## Planned features (future milestones)

- Day-by-day itineraries, packing lists, expenses, and polls connected to the backend
- MongoDB + Mongoose for persistent data
- Real-time sync with Socket.io
- Docker
- GitHub Actions CI/CD

## How to run this project

You need **two terminals** running at the same time — one for the backend, one for the frontend.

### 1. Backend (API server)

```bash
cd server
npm install
node index.js
```

The backend will run at: `http://localhost:5000`

You can check it's working by visiting `http://localhost:5000/api/trips` in your browser — you should see trip data as JSON.

### 2. Frontend (React app)

In a **second terminal**:

```bash
cd client
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

### 3. Using the app

Open `http://localhost:5173` in your browser. You can either:
- Register a new account, or
- Log in with a sample account:
  - Email: `pasindu@example.com`
  - Password: `1234`

## API documentation

A Postman collection covering all backend endpoints (trips + authentication) is included in the `server` folder (`postman_collection.json`). Import it into Postman to explore and test every route.
