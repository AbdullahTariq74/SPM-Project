const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");

// existing routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// FORGOT PASSWORD
router.post("/forgot-password", requestPasswordReset);

// RESET PASSWORD
router.post("/reset-password", resetPassword);
// NEW PROTECTED ROUTE
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User data fetched successfully ✅",
    user: req.user
  });
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully ✅" });
});

const { changePassword } = require("../controllers/auth.controller");

router.post("/change-password", protect, changePassword);

module.exports = router;