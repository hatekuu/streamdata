require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware để xử lý JSON
app.use(express.json({ limit: "10mb" })); // Giới hạn kích thước JSON (cho ảnh base64)
app.use(cors());

// Biến để lưu ảnh dưới dạng Base64
let base64Image = "";

// Route upload ảnh dưới dạng Base64
app.post("/upload", (req, res) => {
  const { image } = req.body; // Lấy ảnh từ body (dạng Base64)

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  base64Image = image; // Lưu ảnh vào biến (thay thế ảnh cũ)
  res.json({ message: "Image uploaded successfully" });
});

// Route xem ảnh
app.get("/image", (req, res) => {
  if (!base64Image) {
    return res.status(404).json({ error: "No image found" });
  }

  // Gửi ảnh Base64 dưới dạng dữ liệu trực tiếp
  res.send(`
    <html>
      <body>
        <img src="data:image/jpeg;base64,${base64Image}" />
      </body>
    </html>
  `);
});

// Chạy server trên cổng từ biến môi trường
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
