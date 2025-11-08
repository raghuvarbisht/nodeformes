import express from "express";
import path from "path";

const app = express();
const absPath = path.resolve("view"); // folder containing your HTML files

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static("public")); // serve CSS, JS, images

// EJS setup
app.set("view engine", "ejs");
app.set("views", absPath);

// Routes for HTML pages
app.get("/", (req, res) => {
  console.log("Serving homepage from:", absPath);
  res.sendFile(path.join(absPath, "home.html"));
});

app.get("/about", (req, res) => {
  console.log("Serving about page from:", absPath);
  res.sendFile(path.join(absPath, "about.html"));
});

app.get("/contact", (req, res) => {
  console.log("Serving contact page from:", absPath);
  res.sendFile(path.join(absPath, "contact.html"));
});

// Dynamic route for form submission
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  res.render("success", { name, email, message });
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(absPath, "404.html"));
});

// Start server
app.listen(8080, () => console.log("✅ Server running on port 8080"));
