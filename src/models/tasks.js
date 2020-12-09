const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const tasks = mongoose.model("tasks", taskSchema);

//exports

module.exports = tasks;
