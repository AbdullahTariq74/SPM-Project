const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const {
  getCertifications,
  createCertification,
  verifyCertification
} = require("../controllers/certification.controller");

const upload = require("../utils/upload");

// PUBLIC VIEW
router.get("/:userId", getCertifications);

// CREATE CERTIFICATION (FREELANCER ONLY)
router.post(
  "/",
  auth,
  allowRoles("freelancer"),
  upload.single("certificate"),
  createCertification
);

router.patch(
  "/:certId/verify",
  auth,
  allowRoles("admin", "moderator"),
  verifyCertification
);

module.exports = router;