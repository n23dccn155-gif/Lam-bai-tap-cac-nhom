const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());

// Custom Middlewares
const logger = require('./src/middlewares/logger');
const errorHandler = require('./src/middlewares/errorHandler');

// Mount logger
app.use(logger);

// Route files
const studentRoutes = require('./src/routes/student.routes');

// Mount routers
app.use('/api/students', studentRoutes);

// Mount error handler (Must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect to database and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
