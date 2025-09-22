require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const entryRoutes = require('./routes/entry');

const app = express();
const port = process.env.PORT || 4000;

// CORS
app.use(cors({
  origin: 'https://contractors-frontend.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// JSON parser
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/entries', entryRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Express Server Running');
});

// Serve static files
app.use('/public', express.static('public'));

// MongoDB connection
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;

const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.p3cmelg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas', err));

// Listen
app.listen(port, () => console.log(`Express Server running on http://localhost:${port}`));
