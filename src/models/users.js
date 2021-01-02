const validator = require("validator");
const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.virtual("tasks", {
  ref: "tasks",
  localField: "_id",
  foreignField: "creater",
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycryptjs.hash(this.password, 8);
  }
  next();
});
userSchema.statics.loginValidation = async (email, password) => {
  const validatedUser = await users.findOne({ email });
  if (!validatedUser) {
    throw new Error("unable to login");
  }
  const isValidated = await bycryptjs.compare(password, validatedUser.password);
  if (!isValidated) {
    throw new Error("unable to login");
  }
  // console.log(validatedUser);
  return validatedUser;
};
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this.id.toString() }, "stringforsigning");
  this.tokens = this.tokens.concat({ token });
  this.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
const users = mongoose.model("users", userSchema);

//exports
module.exports = users;
