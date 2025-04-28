const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Guide = require("../models/Guides");

const register = async (req, res) => {
  const { name, email, password, phoneNumber, collegeName, yearOfStudy, joinYear, expectedPassOutYear, degreeType, degreeName } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      phoneNumber,
      collegeName,
      yearOfStudy,
      joinYear,
      expectedPassOutYear,
      degreeType,
      degreeName,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const registerGuide = async (req, res) => {
  const { name, email, password, phoneNumber, position, collegeName, highestQualification, specialization, yearsOfExperience, previousExperienceAsGuide, extraDetails } = req.body;

  try {
    let guide = await Guide.findOne({ email });
    if (guide) {
      return res.status(400).json({ msg: "Guide already exists" });
    }

    guide = new Guide({
      name,
      email,
      password,
      phoneNumber,
      position,
      collegeName,
      highestQualification,
      specialization,
      yearsOfExperience,
      previousExperienceAsGuide,
      extraDetails,
    });

    const salt = await bcrypt.genSalt(10);
    guide.password = await bcrypt.hash(password, salt);

    await guide.save();

    const payload = {
      guide: {
        id: guide.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


module.exports = { register, login,registerGuide };
