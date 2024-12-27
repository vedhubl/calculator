const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

// Create an instance of Express
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this domain
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Use authentication routes
app.use("/api", authRoutes);

// Handle preflight requests
app.options("*", cors()); // This handles OPTIONS request

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
