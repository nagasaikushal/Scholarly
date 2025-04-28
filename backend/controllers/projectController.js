const Project = require("../models/Projects");
const User = require("../models/Users");

// Submit a new project proposal
const submitProjectProposal = async (req, res) => {
  const { title, abstract, field } = req.body;
  const studentId = req.user.id; // Student ID from the JWT token

  try {
    const newProject = new Project({
      title,
      abstract,
      field,
      student: studentId,
    });

    await newProject.save();
    res.status(201).json({ msg: "Project proposal submitted successfully", project: newProject });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all projects (for admins)
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("student guide");
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all projects of a specific student
const getStudentProjects = async (req, res) => {
  try {
    const projects = await Project.find({ student: req.user.id }).populate("guide");
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Assign a guide to a project
const assignGuide = async (req, res) => {
  const { projectId, guideId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Check if the guide has less than 5 projects
    const guide = await User.findById(guideId);
    const guideProjects = await Project.find({ guide: guideId });
    if (guideProjects.length >= 5) {
      return res.status(400).json({ msg: "Guide has reached the maximum number of projects" });
    }

    project.guide = guideId;
    await project.save();

    res.json({ msg: "Guide assigned successfully", project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Accept or reject a student's project
const acceptRejectProject = async (req, res) => {
  const { projectId, status } = req.body; // status can be "approved" or "rejected"

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.status = status;
    await project.save();

    res.json({ msg: `Project ${status} successfully`, project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Upload project materials (research papers, etc.)
const uploadProjectMaterials = async (req, res) => {
  const projectId = req.body.projectId;
  const materials = req.files.map(file => file.path); // Multer will handle the file upload

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.materials.push(...materials);
    await project.save();

    res.json({ msg: "Materials uploaded successfully", materials });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  submitProjectProposal,
  getAllProjects,
  getStudentProjects,
  assignGuide,
  acceptRejectProject,
  uploadProjectMaterials,
};
