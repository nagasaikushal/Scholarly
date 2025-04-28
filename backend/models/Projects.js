const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  field: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  materials: [String], // List of file paths uploaded
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
