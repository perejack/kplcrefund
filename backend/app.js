// Express backend for demo (API stubs)
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Eligibility check (stub)
app.post('/api/eligibility', (req, res) => {
  // Always return eligible for demo
  res.json({ eligible: true, refund: 1430 });
});

// Payment initiation (stub)
app.post('/api/payment', (req, res) => {
  // Simulate payment initiation (Daraja API stub)
  res.json({ success: true, message: 'STK Push sent' });
});

// Referral endpoint (stub)
app.post('/api/referral', (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
