const AuthModel = require("../../Models/AuthModel/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone, role } = req.body;
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new AuthModel({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({
      message: "Registration successful",
      data: user,
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({ status: 500, sucess: false, message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        sucess: true,
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        sucess: true,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      sucess: true,
      data: { token, userId: user._id, role: user.role },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await AuthModel.find({});
    res.status(200).json({
      message: "All users fetched successfully",
      sucess: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.id);
    res.status(200).json({
      message: "User fetched successfully",
      sucess: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateUser = await AuthModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.send({
      status: 200,
      sucess: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const verifieUser = async (req, res) => {
  try {
    const { isVerified } = req.body;
    const id = req.params.id;
    const makeUserVerified = await AuthModel.findByIdAndUpdate(
      { _id: id },
      { isVerified },
      { new: true }
    );
    res.send({
      status: 200,
      sucess: true,
      message: "User verified successfully",
      data: makeUserVerified,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const id = req.params.id;

    const changeRole = await AuthModel.findByIdAndUpdate(
      { _id: id },
      { role },
      { new: true }
    );
    res.send({
      status: 200,
      sucess: true,
      message: "User role changed successfully",
      data: changeRole,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const changePassword = await AuthModel.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword },
      { new: true }
    );
    res.send({
      status: 200,
      sucess: true,
      message: "User password changed successfully",
      data: changePassword,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await AuthModel.findByIdAndDelete({ _id: id });
    res.send({
      status: 200,
      sucess: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await AuthModel.findOne({ email: email });
    res.status(200).json({
      message: "Admin fetched successfully",
    });

    if (!user) {
      res.status(404).json({
        message: "Admin not found",
      });
    } else {
      const isAdmin = user?.role === "admin";
      res.status(200).json({
        message: "Admin fetched successfully",
        sucess: true,
        isAdmin: isAdmin,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const getSeller = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await AuthModel.findOne({ email: email });

    if (!user) {
      res.status(404).json({
        message: "Seller not found",
      });
    } else {
      const isSeller = user?.role === "seller";
      res.status(200).json({
        message: "Seller fetched successfully",
        sucess: true,
        isSeller: isSeller,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

module.exports = {
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
};
