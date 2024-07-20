const express = require('express');
const app = express();
const port = 8000;

// Define a simple GET route
app.get('/', (req, res) => {
  res.send('Hello, this is your test API!');
});

app.get('/user', (req, res) => {
    res.send('Hello, this is your test API!');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
