const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  email: String,
  userName: String,
  password: String,
  confirmPassword: String,
  token: { type: String },
  isAdmin: { type: Boolean, default: false },
});
// We are hashing the password..

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
  }
  next();
});

// Generating a token..

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { _id: this.id },
      "imshubhampatilfrombrainworkspuneindia"
    );

    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("users", userSchema);

module.exports = User;
