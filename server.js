const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scheduler_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Get available mentors
app.get('/api/mentors', (req, res) => {
  connection.query('SELECT * FROM mentors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get available slots
app.get('/api/slots', (req, res) => {
  const { mentorId, duration } = req.query;
  // Fetch slots logic here
  // Example:
  connection.query('SELECT * FROM slots WHERE mentor_id = ? AND duration = ?', [mentorId, duration], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Schedule a session
app.post('/api/schedule', (req, res) => {
  const { mentorId, studentId, duration, slot } = req.body;
  // Insert scheduling logic here
  // Example:
  connection.query('INSERT INTO schedules (mentor_id, student_id, duration, slot) VALUES (?, ?, ?, ?)', [mentorId, studentId, duration, slot], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Session scheduled successfully!' });
  });
});

// Process payment
app.post('/api/payment', (req, res) => {
  const { duration, mentorId, amount } = req.body;
  // Payment processing logic here
  // Example:
  connection.query('INSERT INTO payments (mentor_id, duration, amount) VALUES (?, ?, ?)', [mentorId, duration, amount], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Payment processed successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
