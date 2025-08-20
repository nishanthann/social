import mongoose, { connection } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "Hey there! 👋 Excited to connect and share experiences.",
    },
    profile_picture: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: string,
        ref: "User",
      },
    ],
    following: [
      {
        type: string,
        ref: "User",
      },
    ],

    connections: [
      {
        type: string,
        ref: "User",
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.model("User", UserSchema);

export default User;
