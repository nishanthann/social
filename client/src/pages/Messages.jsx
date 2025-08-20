import React from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* titles */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Messages
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Talk to your friends and family
          </p>
        </div>

        {/* connected user */}
        <div className="space-y-3 sm:space-y-4">
          {dummyConnectionsData.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={user.profile_picture}
                alt={user.full_name}
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover flex-shrink-0"
              />

              <div className="ml-3 sm:ml-4 flex-1 min-w-0 overflow-hidden">
                <p className="font-semibold text-sm sm:text-base text-slate-800 truncate">
                  {user.full_name}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 truncate">
                  @{user.username}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 truncate hidden sm:block">
                  {user.bio}
                </p>
              </div>

              <div className="flex space-x-1 sm:space-x-2 ml-2 sm:ml-4">
                <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  className="p-1 sm:p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-blue-500 transition-colors"
                  aria-label="Message"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="p-1 sm:p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-purple-500 transition-colors"
                  aria-label="View profile"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
