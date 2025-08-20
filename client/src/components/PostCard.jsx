import { Badge, BadgeCheck } from "lucide-react";
import moment from "moment";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const postWithHashtags = post.content.replace(
    /(#[^\s]+)/g,
    '<span class="text-blue-600">$1</span>'
  );

  const [likes, setLikes] = useState(post.likes_count || 0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentUser = dummyUserData;

  const navigate = useNavigate();

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const handleComment = () => {
    alert(`💬 Commenting as ${currentUser.username}`);
    // later: open comment modal
  };

  const handleShare = () => {
    alert(`📤 ${currentUser.full_name} wants to share post ${post._id}`);
    // later: open share modal
  };

  const handleSave = () => {
    setSaved(!saved);
    alert(saved ? "❌ Removed from saved posts" : "✅ Added to saved posts");
  };
  // later: update DB -> currentUser.posts

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">
      {/* user info💛💛💛💛 */}
      <div
        onClick={() => navigate(`/profile/${post.user._id}`)}
        className="inline-flex items-center gap-3 cursor-pointer"
      >
        <img
          src={post.user.profile_picture}
          alt=""
          className="w-10 h-10 rounded-full shadow"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-bold">{post.user.full_name}</span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-sm text-gray-500">
            @{post.user.username} ● {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* post content and  💛💛💛🧡 */}
      {post.content && (
        <div
          className="text-sm text-gray-800 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}

      {/* images🖼🖼🎭 */}
      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((img, index) => (
          <img
            src={img}
            key={index}
            alt=""
            className={`w-full h-48 object-cover rounded-lg ${
              post.image_urls.length === 1 && "col-span-2 h-auto"
            }`}
          />
        ))}
      </div>

      {/* like share buttons🟡🟡💚🔴🔴 */}
      <div className="flex items-center justify-between text-gray-600 text-sm pt-2 border-t border-gray-300">
        {/* Left actions */}
        <div className="flex items-center gap-6">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} />
            <span>{likes}</span>
          </button>

          {/* Comment */}
          <button
            onClick={handleComment}
            className="flex items-center gap-1 hover:text-blue-500 transition"
          >
            <MessageCircle size={20} />
            <span>{post.comments_count || 0}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-green-500 transition"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>

        {/* Save (right side) */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-1 transition ${
            saved ? "text-purple-600" : "hover:text-purple-600"
          }`}
        >
          <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
