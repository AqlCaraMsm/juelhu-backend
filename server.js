const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Build = require('./models/build');
const Author = require('./models/author');

// Initialize the app
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://xumt:1234@juelhu.cghril3.mongodb.net/juelhu?retryWrites=true&w=majority&appName=juelhu', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes

// Create a new build
app.post('/builds', async (req, res) => {
  const { name, link, coords, authors, section } = req.body;

  try {
    const newBuild = new Build({ name, link, coords, authors, section });
    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all builds
app.get('/builds', async (req, res) => {
  try {
    const builds = await Build.find();
    res.status(200).json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single build by ID
app.get('/builds/:id', async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ error: 'Build not found' });
    res.status(200).json(build);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an build by ID
app.put('/builds/:id', async (req, res) => {
  const { name, link, coords, authors, section } = req.body;

  try {
    const updatedBuild = await Build.findByIdAndUpdate(
      req.params.id,
      { name, link, coords, authors, section },
      { new: true }
    );

    if (!updatedBuild) return res.status(404).json({ error: 'Build not found' });
    res.status(200).json(updatedBuild);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an build by ID
app.delete('/builds/:id', async (req, res) => {
  try {
    const deletedBuild = await Build.findByIdAndDelete(req.params.id);
    if (!deletedBuild) return res.status(404).json({ error: 'Build not found' });
    res.status(200).json({ message: 'Build deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------- Authors

// Read all authors
app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single author by ID
app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
