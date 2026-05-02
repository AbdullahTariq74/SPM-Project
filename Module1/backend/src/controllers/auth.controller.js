const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      role,
      phone_number,
      country
    } = req.body;

    // =========================
    // 1. REQUIRED FIELDS CHECK
    // =========================
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    // =========================
    // 2. PASSWORD LENGTH CHECK
    // =========================
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }

    // =========================
    // 3. STRONG PASSWORD CHECK
    // (letters + numbers)
    // =========================
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least 1 letter and 1 number"
      });
    }

    // =========================
    // 4. CONFIRM PASSWORD CHECK
    // =========================
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match ❌"
      });
    }

    // =========================
    // 5. CHECK EMAIL EXISTS
    // =========================
    const existingUser = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists ❌"
      });
    }

    // =========================
    // 6. HASH PASSWORD
    // =========================
    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // 7. INSERT USER
    // =========================
    const newUser = await pool.query(
      `INSERT INTO users 
      (first_name, last_name, email, password_hash, role, phone_number, country)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id, email, role`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        role,
        phone_number,
        country
      ]
    );

    // =========================
    // 8. CREATE PROFILE AUTOMATICALLY
    // =========================
    await pool.query(
      `INSERT INTO profiles (user_id) VALUES ($1)`,
      [newUser.rows[0].id]
    );

    return res.status(201).json({
      message: "User registered successfully ✅",
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error ❌"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // =========================
    // 1. CHECK USER EXISTS
    // =========================
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const user = userResult.rows[0];

    // =========================
    // 2. CHECK PASSWORD
    // =========================
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    // =========================
    // 3. TOKEN EXPIRY (REMEMBER ME)
    // =========================
    const expiresIn = rememberMe ? "30d" : "1h";

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    // =========================
    // 4. RESPONSE
    // =========================
    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        rememberMe: rememberMe || false
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old and new password are required"
      });
    }

    // get user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    const user = userResult.rows[0];

    // check old password
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update DB
    await pool.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [hashedPassword, userId]
    );

    res.json({
      message: "Password changed successfully ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows.length) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 30 * 60 * 1000);

  await pool.query(
    `UPDATE users 
     SET reset_token=$1, reset_token_expiry=$2
     WHERE email=$3`,
    [token, expiry, email]
  );

  res.json({ message: "Reset token created", token });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await pool.query(
    `SELECT * FROM users 
     WHERE reset_token=$1 
     AND reset_token_expiry > NOW()`,
    [token]
  );

  if (!user.rows.length) {
    return res.status(400).json({ message: "Invalid token" });
  }

  await pool.query(
    `UPDATE users 
     SET password_hash=$1, reset_token=NULL, reset_token_expiry=NULL
     WHERE reset_token=$2`,
    [newPassword, token]
  );

  res.json({ message: "Password reset successful" });
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
  requestPasswordReset,
  resetPassword,

};