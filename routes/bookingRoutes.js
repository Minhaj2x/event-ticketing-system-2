// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bookings route placeholder');
});

module.exports = router;
