# Tests

Client-side tests live here.

## Planned test cases (Step 15 of the guide)

1. Login form validation — shows errors for empty fields
2. Rendering itinerary columns — all 4 columns appear
3. Moving an itinerary card — status changes on arrow click
4. Showing the conflict warning — 409 response triggers conflict UI
5. Loading cached data when API fails
6. Submitting an expense
7. Voting in a poll

## Running tests

```bash
cd client
npm test
```

Tests use **Jest** and **React Testing Library**.
