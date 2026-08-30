const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "tripmate_secret_key_for_school_project";

let trips = [
  {
    id: "t1",
    name: "Paris Adventure",
    destination: "Paris, France",
    startDate: "2026-09-12",
    endDate: "2026-09-18",
    owner: "u1",
    members: ["u1", "u2", "u3"],
    coverEmoji: "🗼",
  },
  {
    id: "t2",
    name: "Tokyo Escape",
    destination: "Tokyo, Japan",
    startDate: "2026-11-01",
    endDate: "2026-11-10",
    owner: "u1",
    members: ["u1", "u2"],
    coverEmoji: "🗾",
  },
];

let users = [
  { id: "u1", name: "Pasindu", email: "pasindu@example.com", password: "1234" },
  { id: "u2", name: "Aisha", email: "aisha@example.com", password: "1234" },
];

app.get('/', (req, res) => {
  res.send('Server is working!');
});

// ---- TRIP ROUTES ----
app.get('/api/trips', (req, res) => {
  res.json(trips);
});

app.get('/api/trips/:id', (req, res) => {
  const trip = trips.find(t => t.id === req.params.id);
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }
  res.json(trip);
});

app.post('/api/trips', (req, res) => {
  const newTrip = {
    id: "t" + (trips.length + 1),
    ...req.body,
  };
  trips.push(newTrip);
  res.status(201).json(newTrip);
});

app.patch('/api/trips/:id', (req, res) => {
  const trip = trips.find(t => t.id === req.params.id);
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }
  Object.assign(trip, req.body);
  res.json(trip);
});

app.delete('/api/trips/:id', (req, res) => {
  const exists = trips.some(t => t.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ message: "Trip not found" });
  }
  trips = trips.filter(t => t.id !== req.params.id);
  res.status(204).send();
});

// ---- AUTH ROUTES ----
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExists = users.some(u => u.email === email);
  if (alreadyExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const newUser = { id: "u" + (users.length + 1), name, email, password };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});