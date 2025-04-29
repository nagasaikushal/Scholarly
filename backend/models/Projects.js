const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  field: { type: String, required: true },
  
  guide: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Guide", // corrected to "Guide" since your first model is Guide
    default: null 
  },
  guideStatus: { 
    type: String, 
    enum: ['assigned', 'open for guide'], 
    default: 'open for guide' 
  },

  teamFormed: { 
    type: Boolean, 
    default: false 
  },
  teamStatus: { 
    type: String, 
    enum: ['team formed', 'open for team'], 
    default: 'open for team' 
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
