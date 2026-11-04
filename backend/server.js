
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const deviceRoutes = require("./routes/devices");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/devices", deviceRoutes);
// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Kiểm tra trạng thái backend
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running successfully"
  });
});

// Khởi động server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
