import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();

// 1️⃣ Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2️⃣ External middleware
app.use(morgan("dev"));                     // logs requests to console
app.use(helmet());                          // sets secure HTTP headers
app.use(cors());                            // allows cross-origin requests
app.use(cookieParser());                    // parses cookies from requests
app.use(compression());                     // compresses responses

// 3️⃣ Rate limiting (external middleware)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // limit each IP to 100 requests per window
});
app.use(limiter);

// 4️⃣ Example routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express app with external middleware!");
});

app.get("/cookies", (req, res) => {
  res.cookie("user", "JohnDoe");
  res.send("Cookie set! Check your browser 🍪");
});

app.get("/data", (req, res) => {
  res.json({ message: "Data fetched successfully" });
});

// 5️⃣ Start server
app.listen(3000, () => console.log("✅ Server running on port 8080"));
