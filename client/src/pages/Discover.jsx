import React, { useState } from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setUsers([]);
      setLoading(true);
      setTimeout(() => {
        setUsers(
          dummyConnectionsData.filter((user) =>
            user.full_name.toLowerCase().includes(input.toLowerCase())
          )
        );
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Discover New Connections
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            connect with people around the world
          </p>
        </div>

        {/* search bar */}
        <div className="mb-8">
          <div className="p-6">
            <div className="relative max-w-xl ">
              {/* Search Icon */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              {/* Input */}
              <input
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleSearch}
                value={input}
                type="text"
                placeholder="Search people by name, username, bio or location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* users */}
        <div className="flex flex-wrap gap-6">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>

        {loading && <Loading height="60vh" />}
      </div>
    </div>
  );
};

export default Discover;
