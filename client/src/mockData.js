export const mockUsers = [
  { id: "u1", name: "Pasindu", email: "pasindu@example.com", avatar: "P" },
  { id: "u2", name: "Aisha", email: "aisha@example.com", avatar: "A" },
  { id: "u3", name: "Ravi", email: "ravi@example.com", avatar: "R" },
];

export const mockTrips = [
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

export const mockItineraryItems = [
  {
    id: "i1",
    tripId: "t1",
    title: "Visit the Louvre",
    description: "Book tickets for the afternoon session",
    day: 1,
    status: "ideas",
    category: "activity",
    estimatedCost: 25,
    assignedTo: "u2",
    version: 0,
  },
  {
    id: "i2",
    tripId: "t1",
    title: "Eiffel Tower Sunset",
    description: "Go up to the second floor for the best view",
    day: 1,
    status: "shortlisted",
    category: "activity",
    estimatedCost: 30,
    assignedTo: "u1",
    version: 0,
  },
  {
    id: "i3",
    tripId: "t1",
    title: "Hotel Check-in",
    description: "Hôtel des Arts, 6th arrondissement",
    day: 1,
    status: "booked",
    category: "hotel",
    estimatedCost: 120,
    assignedTo: "u1",
    version: 0,
  },
  {
    id: "i4",
    tripId: "t1",
    title: "CDG Airport Arrival",
    description: "Terminal 2E, collect luggage then RER B to city",
    day: 1,
    status: "completed",
    category: "transport",
    estimatedCost: 12,
    assignedTo: "u3",
    version: 0,
  },
  {
    id: "i5",
    tripId: "t1",
    title: "Seine River Cruise",
    description: "Evening cruise, 1 hour",
    day: 2,
    status: "ideas",
    category: "activity",
    estimatedCost: 18,
    assignedTo: "u2",
    version: 0,
  },
  {
    id: "i6",
    tripId: "t1",
    title: "Le Jules Verne Dinner",
    description: "Restaurant inside the Eiffel Tower — book early!",
    day: 2,
    status: "shortlisted",
    category: "restaurant",
    estimatedCost: 150,
    assignedTo: "u3",
    version: 0,
  },
];

export const mockPackingItems = [
  { id: "p1", tripId: "t1", name: "Passport", quantity: 1, packed: true, assignedTo: "u1" },
  { id: "p2", tripId: "t1", name: "Travel adaptor", quantity: 2, packed: false, assignedTo: "u1" },
  { id: "p3", tripId: "t1", name: "Euros (cash)", quantity: 1, packed: false, assignedTo: "u2" },
  { id: "p4", tripId: "t1", name: "Sunscreen SPF 50", quantity: 1, packed: true, assignedTo: "u3" },
];

export const mockExpenses = [
  { id: "e1", tripId: "t1", title: "Flight tickets", amount: 480, paidBy: "u1", category: "transport", participants: ["u1", "u2", "u3"] },
  { id: "e2", tripId: "t1", title: "Hotel deposit", amount: 240, paidBy: "u2", category: "accommodation", participants: ["u1", "u2", "u3"] },
  { id: "e3", tripId: "t1", title: "Museum passes", amount: 75, paidBy: "u3", category: "activity", participants: ["u1", "u2", "u3"] },
];

export const mockPolls = [
  {
    id: "po1",
    tripId: "t1",
    question: "Which restaurant for Day 2 dinner?",
    options: [
      { id: "op1", text: "Le Jules Verne (fancy)", votes: ["u1"] },
      { id: "op2", text: "Café de Flore (classic)", votes: ["u2", "u3"] },
      { id: "op3", text: "L'As du Fallafel (budget-friendly)", votes: [] },
    ],
    closesAt: "2026-09-10",
  },
];

export const STATUSES = ["ideas", "shortlisted", "booked", "completed"];

export const STATUS_LABELS = {
  ideas: "Ideas",
  shortlisted: "Shortlisted",
  booked: "Booked",
  completed: "Completed",
};

export const CATEGORY_ICONS = {
  activity: "🎯",
  hotel: "🏨",
  transport: "✈️",
  restaurant: "🍽️",
  other: "📌",
};
