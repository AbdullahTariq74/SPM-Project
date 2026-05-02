const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const multer = require("multer");

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- ROUTE IMPORTS ----------------
const authRoutes = require('./src/routes/auth.routes');
const profileRoutes = require('./src/routes/profile.routes');
const portfolioRoutes = require('./src/routes/portfolio.routes');
const skillsRoutes = require('./src/routes/skills.routes');
const reviewRoutes = require('./src/routes/review.routes');
const workRoutes = require('./src/routes/workHistory.routes');
// ---------------- ROUTES ----------------
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/work', workRoutes);

// ---------------- ROOT ----------------
app.get('/', (req, res) => {
  res.json({ message: 'Module 1 API running 🚀' });
});

// ---------------- STATIC FILES ----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- ERROR HANDLING ----------------
app.use((err, req, res, next) => {

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "File too large ❌ Max 2MB allowed"
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message
    });
  }

  next();
});

app.use("/api/work", require("./src/routes/workHistory.routes"));
app.use("/api/certifications", require("./src/routes/certification.routes"));
app.use("/api/reviews", require("./src/routes/review.routes"));
app.use("/api/verification", require("./src/routes/verification.routes"));
app.use("/api/leaderboard", require("./src/routes/leaderboard.routes"));
app.use("/api/users", require("./src/routes/user.integration.routes"));

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Uploads path:", path.join(__dirname, "uploads"));
});