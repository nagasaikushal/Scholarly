const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, enum: ['assistant professor', 'professor'], required: true },
  collegeName: { type: String, required: true },
  highestQualification: { 
    type: String, 
    enum: ['PhD', 'MSc', 'MTech', 'BTech', 'MA', 'MBA', 'Other'], 
    required: true 
  }, // Available qualifications in dropdown
  specialization: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  previousExperienceAsGuide: { type: String, required: true },
  extraDetails: { type: String }, // Additional details like DOI, Scholar links, etc.
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
