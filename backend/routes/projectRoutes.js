const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const projectController = require("../controllers/projectController");

// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Student submits a project proposal
router.post("/submit", authMiddleware, projectController.submitProjectProposal);

// Admin gets all projects
router.get("/all", authMiddleware, projectController.getAllProjects);

// Student gets their own projects
router.get("/", authMiddleware, projectController.getStudentProjects);

// Guide assigns a guide to a project
router.post("/assign-guide", authMiddleware, projectController.assignGuide);

// Admin accepts/rejects a project
router.post("/status", authMiddleware, projectController.acceptRejectProject);

// Upload project materials
router.post("/upload-materials", authMiddleware, upload.array("materials", 10), projectController.uploadProjectMaterials);

module.exports = router;
