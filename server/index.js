const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('Server is working!');
});

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

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});