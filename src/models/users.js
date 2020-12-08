const validator = require("validator");
const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be postive number");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("invalid email");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("ERROR:Contains Password Keyword");
      }
    },
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bycryptjs.hash(this.password, 8);
  }
});

const users = mongoose.model("users", userSchema);

//exports
module.exports = users;
