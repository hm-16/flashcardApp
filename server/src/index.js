const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_db_connection_string' with your actual MongoDB connection string)
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define routes
app.use('/auth', require('./routes/auth')); // Authentication routes
app.use('/flashcards', require('./routes/flashcards')); // Flashcard routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
