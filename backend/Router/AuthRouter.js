const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  verifieUser,
  changeUserRole,
  changeUserPassword,
  deleteUserById,
  getAdmins,
  getSeller,
} = require("../Controllers/AuthController/AuthController");

router.get("/user", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);
router.put("/update-user/:id", updateUserById);
router.put("/verify-user/:id", verifieUser);
router.put("/role/:id", changeUserRole);
router.put("/change-password/:id", changeUserPassword);
router.delete("/user-delete/:id", deleteUserById);
router.get("/admin/:email", getAdmins);
router.get("/seller/:email", getSeller);

module.exports = router;
