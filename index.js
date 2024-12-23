// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const errorHandler = require('./middleware/error');

// Route imports
const authRoutes = require('./routes/auth');
const pointsRoutes = require('./routes/points');
const rewardsRoutes = require('./routes/rewards');
const announcementsRoutes = require('./routes/announcements');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/announcements', announcementsRoutes);

// Error handling
app.use(errorHandler);

// Database connection
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
