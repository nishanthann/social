import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";
import { clerkMiddleware } from "@clerk/express";

import { serve } from "inngest/express";
import userRouter from "./routes/usesRoutes.js";

// FOBgYXhUwNb3122l
// nizhanth23
// Configuration
dotenv.config();
const app = express();
await connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("server is running✅"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`server is running✅ on port ${PORT}`));
