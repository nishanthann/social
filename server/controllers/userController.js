// get user data using userid
import fs from "fs";
import User from "../Models/User.js";
import imagekit from "../configs/imageKit.js";
import Connection from "../Models/Connection.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    } else {
      return res.json({ success: true, user });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// update user data

export const updateUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    // Get the data from the request body. Destructure only the fields you want to update.
    const { username, bio, location, full_name } = req.body;

    const updatedData = {};

    // Check if the user is attempting to update their username
    if (username) {
      const currentUser = await User.findById(userId);

      // Only perform the duplicate check if the new username is different from the old one
      if (currentUser.username !== username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          // If a user with this username already exists, send an error and return
          return res
            .status(409)
            .json({ success: false, message: "Username is already taken" });
        }
      }
      // If the username is not taken, add it to the data to be updated
      updatedData.username = username;
    }

    // Add other fields to the updatedData object if they exist in the request body
    if (bio) updatedData.bio = bio;
    if (location) updatedData.location = location;
    if (full_name) updatedData.full_name = full_name;

    // Handle profile picture upload
    const profile = req.files.profile && req.files.profile[0];
    if (profile) {
      const buffer = fs.readFileSync(profile.path);
      const response = await imagekit.upload({
        file: buffer,
        fileName: profile.originalname,
      });
      const url = imagekit.url({
        path: response.filePath,

        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: 512 },
        ],
      });
      updatedData.profile_picture = url;
    }

    // Handle cover photo upload
    const cover = req.files.cover && req.files.cover[0];
    if (cover) {
      const buffer = fs.readFileSync(cover.path);
      const response = await imagekit.upload({
        file: buffer,
        // FIX: Use cover.originalname instead of profile.originalname
        fileName: cover.originalname,
      });
      const url = imagekit.url({
        path: response.filePath,

        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: 1280 },
        ],
      });
      updatedData.cover_photo = url;
    }

    // Only proceed with the update if there is data to update
    if (Object.keys(updatedData).length === 0) {
      return res.json({ success: true, message: "No data to update" });
    }

    // Update the user and return the newly updated document
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.json({ success: true, user, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// find user using username,email,location,name

export const discoverUsers = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { input } = req.body;

    const allUsers = await User.find({
      $or: [
        { username: { $regex: input, $options: "i" } },
        { email: { $regex: input, $options: "i" } },
        { location: { $regex: input, $options: "i" } },
        { full_name: { $regex: input, $options: "i" } },
      ],
    });
    const filteredUsers = allUsers.filter((user) => user._id !== userId);
    return res.json({ success: true, users: filteredUsers });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// followuser

export const followUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);
    if (user.following.includes(id)) {
      return res.json({ success: false, message: "already following" });
    }
    user.following.push(id);
    await user.save();
    const toUser = await User.findById(id);
    if (toUser.followers.includes(userId)) {
      return res.json({ success: false, message: "already following" });
    }
    toUser.followers.push(userId);
    await toUser.save();
    return res.json({ success: true, message: "user followed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// unfollowuser

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);
    user.following = user.following.filter((user) => user !== id);
    await user.save();
    const toUser = await User.findById(userId);
    toUser.followers = toUser.followers.filter((user) => user !== id);
    await toUser.save();
    return res.json({ success: true, message: "user unfollowed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;
    // check if user can send more than 20 connection requests in the last 24 hrs
    const last24hrs = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const connectionRequests = await Connection.find({
      from_user_id: userId,
      created_at: { $gt: last24hrs },
    });
    if (connectionRequests.length >= 20) {
      return res.json({
        success: false,
        message: "You can only send 20 request in a day",
      });
    }
    // check users are already connected
    const connection = await Connection.findOne({
      $or: [
        { from_user_id: userId, to_user_id: id },
        { from_user_id: id, to_user_id: userId },
      ],
    });
    if (!connection) {
      await Connection.create({ from_user_id: userId, to_user_id: id });
      return res.json({ success: true, message: "connection request sent" });
    } else if (connection.status === "accepted") {
      return res.json({ success: false, message: "already connected" });
    }
    return res.json({ success: false, message: "conection request pending" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get user connection

export const getUserConnections = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const user = await User.findById(userId).populate(
      "connections followers following"
    );
    const connections = user.connections;
    const followers = user.followers;
    const following = user.following;

    const pendingConnections = (
      await Connection.find({ to_user_id: userId, status: "pending" }).populate(
        "from_user_id"
      )
    ).map((connection) => connection.from_user_id);

    return res.json({
      success: true,
      connections,
      followers,
      following,
      pendingConnections,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// accep connection request

export const acceptConnectionRequest = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;
    const connection = await Connection.findOne({
      from_user_id: id,
      to_user_id: userId,
    });
    if (!connection) {
      return res.json({
        success: false,
        message: "connection request not found",
      });
    }
    const user = await User.findById(userId);
    user.connections.push(id);
    await user.save();
    const toUser = await User.findById(id);
    toUser.connections.push(userId);
    await toUser.save();
    connection.status = "accepted";
    await connection.save();
    return res.json({ success: true, message: "connection request accepted" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
