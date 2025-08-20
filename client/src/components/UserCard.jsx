import React from "react";
import { dummyUserData } from "../assets/assets";
import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react";

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;
  const handleFollow = async () => {};
  const handleConnectRequest = async () => {};
  return (
    <div
      key={user._id}
      className="p-6 flex flex-col justify-between w-72 bg-white shadow-md border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-200"
    >
      <div className="text-center">
        <img
          className="rounded-full w-20 h-20 shadow-md mx-auto object-cover"
          src={user.profile_picture}
          alt={user.full_name}
        />
        <p className="mt-4 font-semibold text-slate-800">{user.full_name}</p>
        {user.username && (
          <p className="text-sm text-slate-500">@{user.username}</p>
        )}
        {user.bio && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">{user.bio}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Location */}
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <MapPin className="w-4 h-4" />
          {user.location && (
            <span className="text-xs text-slate-500 ml-1">{user.location}</span>
          )}
        </div>

        {/* Followers */}
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span className="text-xs text-slate-500 ml-1">
            {user.followers.length} Followers
          </span>
        </div>
      </div>

      <div className="flex mt-4 gap-2">
        {/* Follow Button  */}
        <button
          disabled={currentUser.following.includes(user._id)}
          onClick={handleFollow}
          className={` w-full
                        flex items-center justify-center gap-1
                        px-4 py-2 rounded-full 
                        text-white font-medium text-sm
                        bg-gradient-to-r from-purple-500 to-indigo-600
                        hover:from-purple-600 hover:to-indigo-700
                        transition-all duration-200
                        shadow-md hover:shadow-lg
                        active:scale-95
                    `}
        >
          <UserPlus className="w-4 h-4" />
          {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
        </button>
        {/* connection button */}
        <button>
          {currentUser?.connections.includes(user._id) ? (
            <button className="w-full flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95">
              <MessageCircle className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConnectRequest}
              className="w-full flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
