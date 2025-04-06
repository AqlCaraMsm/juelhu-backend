const mongoose = require('mongoose');

// Define the schema for the Build
const buildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  coords: { type: [Number], required: true },
  authors: [{
    id: { type: String, required: true },
    name: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Build', buildSchema);
