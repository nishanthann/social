import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js"; // your Inngest setup

dotenv.config();
const app = express();
await connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is running✅"));

// Example endpoint to trigger Inngest functions
app.post("/api/inngest/event", async (req, res) => {
  const { name, data } = req.body;

  try {
    await inngest.send(name, data); // trigger the event
    res.status(200).json({ message: "Event sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send event" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
