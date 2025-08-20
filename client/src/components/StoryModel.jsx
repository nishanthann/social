import { ArrowLeft, Sparkle, TextIcon, Upload } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StoryModel = ({ setShowModal, fetchStories }) => {
  const bgColors = [
    "#FBBF24", // amber-400
    "#34D399", // green-400
    "#60A5FA", // blue-400
    "#A78BFA", // purple-400
    "#F472B6", // pink-400
    "#38BDF8", // sky-400
    "#FB923C", // orange-400
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateStory = async () => {};

  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white  flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowModal(false)}
            className="text-white p-2 cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10"></span>
        </div>

        <div
          className="rounded-lg h-96 flex items-center justify-center relative"
          style={{ backgroundColor: background }}
        >
          {mode === "text" && (
            <textarea
              className="bg-transparent text-white  w-full h-full p-6 text-lg resize-none focus:outline-none"
              placeholder="Whats on your mind?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          {mode === "media" &&
            previewUrl &&
            (media?.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt=""
                className="object-contain max-h-full"
              />
            ) : (
              <video
                src={previewUrl}
                alt=""
                className="object-contain max-h-full"
              />
            ))}
        </div>

        <div className="flex mt-4 gap-2">
          {bgColors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded-full ring cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => setBackground(color)}
            />
          ))}
        </div>

        <div className="flex mt-4 gap-2">
          <button
            className={`cursor-pointer flex-1 flex items-center justify-center gap-2 p-2 rounded
            ${mode === "text" ? "bg-white text-black" : "bg-zinc-800"}`}
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
              setBackground("green");
            }}
          >
            <TextIcon size={18} />
            Text
          </button>
          <label
            htmlfor="media-upload"
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
              mode === "media" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            <input
              type="file"
              id="media-upload"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                handleMediaUpload(e);
                setMode("media");
              }}
            />
            <Upload size={18} />
            Media
          </label>
        </div>
        <button
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: "Creating story...",
              success: "Story created successfully!",
              error: (e) => <p>{e.message}</p>,
            })
          }
          className=" flex items-center justify-center gap-2 py-2.5 mt-4 w-full  rounded-lg bg-gradient-to-r from bg-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer"
        >
          <Sparkle size={18} />
          Create Story
        </button>
      </div>
    </div>
  );
};

export default StoryModel;
