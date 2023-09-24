const express = require('express');
const app = express();
const Grocery = require('./models/grocery'); // Import Grocery model
const Bills = require('./models/bill'); // Import Bills model

const groceriesRouter = require('./routes/bills'); // Importing the routes
const billsRouter = require('./routes/groceries'); // Importing the routes

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/padpals', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


