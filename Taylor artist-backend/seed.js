import mongoose from "mongoose";
import "dotenv/config";
import Admin from "./src/models/Admin.js";

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: "taylorartist18@gmail.com" });
    
    if (adminExists) {
      console.log("Admin already exists with email: taylorartist18@gmail.com");
      console.log("Updating password...");
      
      // Update password
      adminExists.password = "01402tac";
      await adminExists.save();
      
      console.log("Admin updated successfully!");
      console.log("Email: taylorartist18@gmail.com");
      console.log("Password: 01402tac");
    } else {
      // Create new admin
      const admin = new Admin({
        email: "taylorartist18@gmail.com",
        password: "01402tac",
        name: "Taylor Admin",
        role: "superadmin",
      });
      
      await admin.save();
      
      console.log("✅ Admin created successfully!");
      console.log("Email: taylorartist18@gmail.com");
      console.log("Password: 01402tac");
    }

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

// Run the seed
seedAdmin();
