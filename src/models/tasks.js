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
taskSchema.pre("save", async function (next) {
  console.log("ran before save");
  next();
});

const tasks = mongoose.model("tasks", taskSchema);

//exports

module.exports = tasks;
