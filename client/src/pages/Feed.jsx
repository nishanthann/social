import React, { useEffect } from "react";
import { useState } from "react";
import { dummyPostsData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";
import Recentmessage from "../components/Recentmessage";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };
  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* stories and post lists 🟡*/}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => {
            return <PostCard post={post} key={post._id} />;
          })}
        </div>
      </div>

      {/* Rightside bar🟡 */}
      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            alt=""
            className="w-75 h-50 rounded-md"
          />
          <p className="text-slate-600">Email marketing</p>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">
            Boost engagement with campaigns. Our email solutions deliver
            measurable results with open rates.
          </p>
        </div>
        {/* <RecentMessages /> */}
        <Recentmessage />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
