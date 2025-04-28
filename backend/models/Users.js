const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  yearOfStudy: { type: Number, required: true }, // e.g., 1 for 1st year, 2 for 2nd year, etc.
  joinYear: { type: Number, required: true },
  expectedPassOutYear: { type: Number, required: true },
  degreeType: { type: String, enum: ['bachelor', 'master'], required: true }, // e.g., Bachelor's or Master's
  degreeName: { type: String, required: true }, // e.g., CSE, ECE, etc.
});

const User = mongoose.model("User", userSchema);

module.exports = User;
