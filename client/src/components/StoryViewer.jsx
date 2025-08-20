import { BadgeCheck, CrossIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;
    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);
      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;
      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
        if (elapsed >= duration) {
          clearInterval(progressInterval);
          setViewStory(null);
        }
      }, setTime);
    }
    return () => {
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  if (!viewStory) return null;

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain"
          />
        );
      case "video":
        return (
          <video
            onEnded={() => setViewStory(null)}
            controls={true}
            src={viewStory.media_url}
            className="max-w-full max-h-screen object-contain"
          />
        );
      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center">
            {viewStory.content}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-110 h-screen"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.backgroundColor
            : "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Progress Bar🟨 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 ">
        <div
          className="h-full bg-white transition-all duration-100 ease-in-out linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* User info top left */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-gray-400/50">
        <img
          src={viewStory.user.profile_picture}
          alt=""
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} className="w-4 h-4 text-blue-500" />
        </div>
      </div>
      {/* Close button 🔴 */}
      <button>
        <X
          className="absolute top-4 right-4 text-white cursor-pointer"
          onClick={() => setViewStory(null)}
        />
      </button>
      {/* content wrapper🟨 */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;
