import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Seed default admin
export const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@taylorartist.me" });
    
    if (!adminExists) {
      const admin = new Admin({
        email: "admin@taylorartist.me",
        password: "admin123",
        name: "Taylor Admin",
        role: "superadmin",
      });
      
      await admin.save();
      console.log("Default admin seeded successfully");
      console.log("Email: admin@taylorartist.me");
      console.log("Password: admin123");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

// Admin Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide email and password" 
      });
    }
    
    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || "taylor_admin_secret",
      { expiresIn: "24h" }
    );
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Verify Token
export const verifyToken = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        message: "Admin not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
    
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Current password is incorrect" 
      });
    }
    
    admin.password = newPassword;
    await admin.save();
    
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
