import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import {} from './ingest/index.js'

// FOBgYXhUwNb3122l
// nizhanth23
// Configuration
dotenv.config();
const app = express();
await connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("server is running✅"));
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, () => console.log(`server is running✅ on port ${PORT}`));
