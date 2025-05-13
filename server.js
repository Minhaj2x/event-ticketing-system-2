const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route for welcome page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Event Ticketing System API</h1>');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// 404 Handler
app.use('*', (req, res) => {
  if (req.headers.accept?.includes('html')) {
    res.status(404).send('<h1>404 Not Found</h1>');
  } else {
    res.status(404).json({ error: '404 Not Found' });
  }
});

// MongoDB connection + start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server running on port ' + process.env.PORT);
    });
  })
  .catch(err => console.log(err));
