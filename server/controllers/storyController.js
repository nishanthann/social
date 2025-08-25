// add user story

import imagekit from "../configs/imageKit.js";
import { inngest } from "../inngest/index.js";
import Story from "../Models/Story.js";
import User from "../Models/User.js";

export const addUserStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, background_color } = req.body;
    const media = req.file;
    let media_url = "";
    if (media_type === "image" || media_type === "video") {
      const fileBuffer = fs.readFileSync(media.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: media.originalname,
      });
      media_url = response.url;
    }
    // create story
    const story = await Story.create({
      user: userId,
      content,
      media_type,
      media_url,
      background_color,
    });
    // schedule story deletion
    await inngest.send({
      name: "app/story.delete",
      data: { storyId: story._id },
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

// get user story
export const getStories = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    // user connestion and following

    const userids = [userId, ...user.connections, ...user.following];

    const stories = await Story.find({
      user: {
        $in: userids,
      },
    })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json({ success: true, stories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
