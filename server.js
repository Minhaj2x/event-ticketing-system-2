const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes  = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/auth',  authRoutes);    // auth/register, auth/login, auth/me
app.use('/api/events', eventRoutes);  // events/create (admin only)

app.use((req, res) => res.status(404).json({ error: '404 Not Found' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT||5050, () => console.log('🔌 Server up')))
  .catch(err => console.error(err));
