import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/pingup`);
    console.log("Database connected✅"); // <-- guaranteed log

    mongoose.connection.on("error", (err) =>
      console.error("Database connection error❌:", err)
    );
  } catch (error) {
    console.error("Failed to connect to database❌:", error.message);
    process.exit(1);
  }
};

export default connectDB;
