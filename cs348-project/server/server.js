const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const reportRoutes = require('./routes/reports');
const tripRoutes = require('./routes/Trips');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/trips', tripRoutes);

// MongoDB connection (directly included)
mongoose.connect(
  'mongodb+srv://mencarnado03:%40Maremare03@cluster0.vj51gqv.mongodb.net/Travelapp?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
