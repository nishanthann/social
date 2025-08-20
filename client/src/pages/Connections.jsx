import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  User,
  UserCheck,
  UserPlus,
  UserRoundPen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pending,
} from "../assets/assets";

const Connections = () => {
  const [currentTab, setCurrentTab] = useState("Followers");
  const navigate = useNavigate();
  const dataArray = [
    { label: "Followers", value: followers, icon: User },
    { label: "Following", value: following, icon: UserCheck },
    {
      label: "Pending ",
      value: pending,
      icon: UserRoundPen,
    },
    { label: "Connections", value: connections, icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Connections
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Talk to your friends and family
          </p>
        </div>

        {/* counts */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <span className="text-2xl font-bold text-indigo-600">
                {item.value.length}
              </span>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* tabs */}
        <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm">
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                currentTab === tab.label
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4 mr-1" />
              <span className="ml-1">{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* connections */}
        <div className="flex flex-wrap gap-6 mt-6">
          {dataArray
            .find((item) => item.label === currentTab)
            .value.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover flex-shrink-0"
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold text-slate-800">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-slate-500">@{user.username}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {user.bio.slice(0, 30)}...
                  </p>
                  <div className="flex max-sm:flex-col gap-2 mt-4">
                    {/* View Profile */}
                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="px-3 py-1 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow transition"
                    >
                      View Profile
                    </button>

                    {/* Conditional buttons */}
                    {currentTab === "Following" && (
                      <button className="px-3 py-1 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow transition">
                        Unfollow
                      </button>
                    )}
                    {currentTab === "Pending" && (
                      <button className="px-3 py-1 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow transition">
                        Accept
                      </button>
                    )}
                    {currentTab === "Connections" && (
                      <button
                        onClick={() => navigate(`/messages/${user._id}`)}
                        className="flex items-center gap-1 px-3 py-1 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
