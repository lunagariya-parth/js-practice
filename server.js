const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const cors = require("cors");
// Routes
const postRoutes = require("./routes/api/posts");

const app = express();

// BodyParsor Middleware
app.use(express.json());
app.use(cors())
// Connect with MongoDB using new options
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the database");

    // User Routes
    app.use("/api/posts", postRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    // Add appropriate error handling logic here
  });

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Node");
});
