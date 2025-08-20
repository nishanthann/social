import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { X, User, MapPin, Image as ImageIcon, Save } from "lucide-react";

const ProfileModal = ({ onClose }) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    full_name: user.full_name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditForm({ ...editForm, profile_picture: e.target.files[0] });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    console.log("Profile saved:", editForm);
    // TODO: Add API call here
  };

  return (
    <div className="fixed inset-0 z-50 h-screen overflow-y-scroll bg-black/50 flex justify-center items-start sm:items-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Edit Profile
        </h1>

        <form className="space-y-5" onSubmit={handleSaveProfile}>
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <label
              htmlFor="profile_picture"
              className="cursor-pointer relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed hover:bg-gray-200"
            >
              {editForm.profile_picture ? (
                // Preview newly selected file
                <img
                  src={URL.createObjectURL(editForm.profile_picture)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : user.profile_picture ? (
                // Show existing profile picture
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : (
                // Placeholder icon if nothing
                <ImageIcon className="w-8 h-8 text-gray-500" />
              )}

              <input
                type="file"
                id="profile_picture"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
            <p className="text-sm text-gray-500">Change Profile Picture</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
              <User className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                name="full_name"
                value={editForm.full_name}
                onChange={handleChange}
                className="flex-1 bg-transparent focus:outline-none"
                placeholder="Enter full name"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={editForm.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={editForm.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write something about yourself..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
              <MapPin className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleChange}
                className="flex-1 bg-transparent focus:outline-none"
                placeholder="Enter location"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
