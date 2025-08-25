import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Message from "../Models/Message.js";
// create an empty object to hold all connection-related functions
const connections = {};

// controller function for the SSE endpoint
export const messageSSE = async (req, res) => {
  const { userId } = req.params;
  console.log("New SSE connection for user:", userId);

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Function to send a message to the client
  connections[userId] = res;
  res.write(`log: New SSE connection\n\n`);

  // Initial message to confirm connection
  // sendMessage({ message: "SSE connection established" });

  // Listen for new messages using Inngest
  // const unsubscribe = inngest.listen({
  //   name: "app/message.new",
  //   onReceive: (event) => {
  //     const { to_user_id, message } = event.data;
  //     if (to_user_id === userId) {
  //       sendMessage({ message });
  //     }
  //   },
  // });

  // Clean up when the client disconnects
  req.on("close", () => {
    delete connections[userId];
    //   unsubscribe();
    console.log("SSE connection closed for user:", userId);
  });
};

// send message
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;

    let media_url = "";
    let message_type = image ? "image" : "text";

    if (message_type === "image") {
      const fileBuffer = fs.readFileSync(image.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: image.originalname,
      });
      media_url = imagekit.url({
        src: response.url,
        transformation: [
          { height: "300", width: "400", quality: "auto", format: "webp" },
        ],
      });
    }
    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      media_url,
      message_type,
      // timestamp:new Date().toISOString()
    });
    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
    });
    // send message to_user_id server side events connection
    const messageWithUserDetails = await Message.findById(message._id).populate(
      "from_user_id"
    );
    if (connections[to_user_id]) {
      connections[to_user_id].write(
        `data: ${JSON.stringify({ messageWithUserDetails })}\n\n`
      );
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// get all messages between two users
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;
    const messages = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id },
        { from_user_id: to_user_id, to_user_id: userId },
      ],
    }).sort({ createdAt: 1 });
    // .populate("from_user_id")
    // .populate("to_user_id");

    await Message.updateMany({
      from_user_id: to_user_id,
      to_user_id: userId,
      seen: true,
    });
    res.json({
      status: "success",
      messages,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const getRecentChats = async (req, res) => {
  try {
    const { userId } = req.auth();
    // aggregate messages to get the recent chat list
    const recentChats = await Message.find(
      {
        to_user_id: userId,
      }
        .populate("from_user_id to_user_id")
        .sort({ createdAt: -1 })
    );
    res.json({
      status: "success",
      recentChats,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
