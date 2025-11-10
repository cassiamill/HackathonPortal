import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// Example route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Example POST route
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `User ${name} with email ${email} saved!` });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
