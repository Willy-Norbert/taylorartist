import express from "express";
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";
import statsRouter from "./src/routes/statsRoute.js";
import adminRouter from "./src/routes/adminRoute.js";
import { seedAdmin } from "./src/controllers/adminController.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Seed default admin
seedAdmin();

//middlewares
app.use(express.json())

// CORS configuration for custom domains
const allowedOrigins = [
  'https://taylorartist.irabaruta.online',
  'https://admin.irabaruta.online',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    return callback(null, true); // Allow all origins
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}))

// Handle OPTIONS preflight
app.options('*', cors())

//initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/stats", statsRouter)
app.use("/api/admin", adminRouter)
app.get('/', (req, res) => res.send("API Working"));


app.listen(port, () => console.log(`Server started on ${port}`));
