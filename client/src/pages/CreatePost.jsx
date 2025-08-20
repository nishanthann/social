import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { ImagePlus, Loader2, Send } from "lucide-react";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData; // pick first dummy user

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
  };

  const handlePost = () => {
    if (!content.trim() && images.length === 0) return;
    setLoading(true);

    setTimeout(() => {
      console.log("New Post Created:", {
        user: user.full_name,
        content,
        images,
      });

      setContent("");
      setImages([]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-xl ml-20 mt-16 bg-white p-4 rounded-2xl shadow-md ">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={user.profile_picture}
          alt={user.full_name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.full_name}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full mt-4 p-3 border rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
        rows="3"
      />

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt="preview"
                className="rounded-lg object-cover w-full h-40"
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Upload button */}
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
          <ImagePlus className="h-5 w-5 text-indigo-600" />
          <span className="text-sm text-gray-600">Add Image</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Post button */}
        <button
          onClick={handlePost}
          disabled={loading || (!content.trim() && images.length === 0)}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Post
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
