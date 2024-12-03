require("dotenv").config(); // Import dotenv để load biến môi trường

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware để xử lý JSON
app.use(express.json());

// Lấy PORT và DB từ biến môi trường
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.DB;

// Kết nối đến MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Định nghĩa schema và model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// Các route cơ bản
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js and MongoDB app!");
});

// Thêm người dùng
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lấy danh sách người dùng
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chạy server trên cổng từ biến môi trường
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
