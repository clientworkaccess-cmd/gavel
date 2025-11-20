import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import bodyParser from "body-parser";
import router from "./routes/route.js";

const app = express();


// ✅ CORS Configuration — move this *before* routes
const allowedOrigins = [
  "http://localhost:5173",
  "https://s43t94b4-5173.asse.devtunnels.ms",
  "https://joingavel.com",
  "https://www.joingavel.com",
  "https://evolvegov.com",
  "https://www.evolvegov.com",
  "https://gavel-frontend.vercel.app",
  "https://gavel-frontend-ot269fd8s-clientworkaccess-2804s-projects.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Mount all API routes
app.use(router);

// ✅ Basic route
app.get("/", (req, res) => {
  res.send("✅ Express server is running successfully!");
});

// ✅ Database connection

// ✅ Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

export default app;