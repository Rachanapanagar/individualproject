const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Pivotree', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema for the items
const itemSchema = new mongoose.Schema({
  ModelName : String,
  Color: String,
  HeadphoneType: String,
  Price: Number,
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next()
}) 

app.get('/login', async (req, res) => {
  res.send('login');
})

// Serve HTML file with data from MongoDB
app.get('/', async (req, res) => {
  try {
    // Fetch items from MongoDB
    const items = await Item.find();
    console.log('Fetched items:', items);

    // Render HTML with data
    res.send(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});