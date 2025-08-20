import React, { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { ImageIcon, SendHorizonal } from "lucide-react";

const ChatBox = () => {
  const messages = dummyMessagesData;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(dummyUserData);

  const messageEndRef = useRef(null);

  const sendMessage = async () => {};

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    user && (
      <div className="w-5xl ml-7 rounded-lg  flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b bg-white shadow-sm">
          <img
            src={user.profile_picture}
            alt={user.full_name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{user.full_name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.to_user_id === user._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-2 text-sm max-w-xs md:max-w-sm rounded-lg shadow ${
                    message.to_user_id === user._id
                      ? "bg-indigo-500 text-white rounded-br-none"
                      : "bg-white text-gray-700 rounded-bl-none"
                  }`}
                >
                  {message.message_type === "image" && (
                    <img
                      src={message.media_url}
                      alt=""
                      className="rounded-lg mb-1 max-h-60 object-cover"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t bg-white">
          <div className="flex items-center gap-2">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <ImageIcon className="w-5 h-5 text-gray-600" />
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={sendMessage}
              className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;
