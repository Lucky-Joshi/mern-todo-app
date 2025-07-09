require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => { // Root route
  res.send('🚀 To-Do Backend API Running');
});

const PORT = process.env.PORT || 5000; // Start the server
app.listen(PORT, () => { 
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
