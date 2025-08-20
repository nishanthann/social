import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
import ProfileModal from "../components/ProfileModal";

const Profile = () => {
  const profileId = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-38 sm:h-46 bg-indigo-500 relative">
        {user.cover_photo && (
          <img
            src={user.cover_photo}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-4 sm:left-8">
          <div className="relative">
            <img
              src={user.profile_picture}
              alt={user.full_name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white object-cover"
            />
            {user.is_verified && (
              <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-4 sm:px-8 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              {user.full_name}
              {user.is_verified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </h1>
            <p className="text-gray-600">
              {user.username ? `@${user.username}` : "Add a username"}
            </p>

            {user.bio && (
              <p className="mt-2 text-gray-700 whitespace-pre-line">
                {user.bio}
              </p>
            )}

            {user.location && (
              <div className="mt-2 flex items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {(!profileId.id || profileId.id === dummyUserData._id) && (
              <button
                onClick={() => setShowEdit(true)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-medium transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{posts.length}</span>
            <span className="text-gray-600">Posts</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{user.followers.length}</span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{user.following.length}</span>
            <span className="text-gray-600">Following</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "posts"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "media"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Media
            </button>
            <button
              onClick={() => setActiveTab("likes")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "likes"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Likes
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl ml-7 px-4 sm:px-6 py-6">
        {activeTab === "posts" && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.profile_picture}
                    alt={post.user.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{post.user.full_name}</p>
                    <p className="text-gray-500 text-sm">
                      @{post.user.username}
                    </p>
                  </div>
                </div>

                {post.content && (
                  <p className="mt-3 whitespace-pre-line">{post.content}</p>
                )}

                {post.image_urls?.length > 0 && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img
                      src={post.image_urls[0]}
                      alt="Post"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                )}

                <div className="mt-4 flex items-center gap-4 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{post.likes_count.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>0</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "media" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {posts
              .filter((post) => post.image_urls?.length > 0)
              .map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={post.image_urls[0]}
                    alt="Media"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        )}

        {activeTab === "likes" && (
          <div className="text-center py-10">
            <p className="text-gray-500">No liked posts yet</p>
          </div>
        )}
      </div>
      {showEdit && <ProfileModal onClose={() => setShowEdit(false)} />}
    </div>
  ) : (
    <Loading height="100vh" />
  );
};

export default Profile;
