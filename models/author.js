const mongoose = require('mongoose');

// Define the schema for the Author
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  block_id: { type: String, required: true },
  block_name: { type: String, required: true },
  minecraft_uuid: { type: String, required: false }
});

module.exports = mongoose.model('Author', authorSchema);
