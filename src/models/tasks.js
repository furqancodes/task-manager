const mongoose = require("mongoose");

const tasks = mongoose.model("tasks", {
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
//exports

module.exports = tasks;
