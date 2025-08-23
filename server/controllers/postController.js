import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const addPost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, post_type } = req.body;
    const images = req.files;
    let image_urls = [];

    if (images.length) {
      image_urls = await Promise.all(
        images.map(async (image) => {
          const fileBuffer = fs.readFileSync(image.path);
          const response = await imagekit.upload({
            file: fileBuffer,
            fileName: image.originalname,
            folder: "posts",
          });
          const url = imagekit.url({
            path: response.filePath,

            transformation: [
              { quality: "auto" },
              { format: "webp" },
              { width: 1280 },
            ],
          });
          return url;
        })
      );
    }
    await Post.create({
      user: userId,
      content,
      post_type,
      image_urls,
    });
    res.json({ success: true, message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get post🟡🟡
export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    const userIds = [userId, ...user.connections, ...user.following];
    const post = await Post.find({ user: { $in: userIds } })
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// like post💚💚

export const likePosts = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (post.likes.includes(userId)) {
      post.likes_count = post.likes.filter((id) => id !== userId);
      await post.save();
      res.json({ success: true, message: "Post unliked" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
