const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  userid: {
    type: String,
    requierd: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tasks', TaskSchema);
