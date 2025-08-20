import { useEffect, useState } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom"; // Removed unused 'Links' import
import moment from "moment";

const Recentmessage = () => {
  const [messages, setMessages] = useState([]);

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData);
  };

  useEffect(() => {
    fetchRecentMessages();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md mt-4 shadow min-h-20 max-w-xs text-xs text-slate-800">
      <h3 className="text-slate-800 font-semibold mb-4">Recent Messages</h3>
      <div className="flex flex-col max-h-56 overflow-y-auto no-scrollbar">
        {messages.map(
          (
            message // Removed unused index parameter
          ) => (
            <Link
              key={message._id} // Better to use message._id instead of index
              to={`/messages/${message.from_user_id._id}`}
              className="flex items-start gap-2 py-2 px-1 hover:bg-slate-100 rounded"
            >
              <img
                src={message.from_user_id.profile_picture} // Assuming avatar is a property
                alt={message.from_user_id.full_name}
                className="w-8 h-8 rounded-full"
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="font-medium text-slate-800">
                    {message.from_user_id.full_name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {moment(message.createdAt).fromNow()}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <p className="text-slate-500 text-xs truncate max-w-[160px]">
                    {message.text ? message.text : "media"}
                  </p>
                  {!message.seen && (
                    <span className="bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      1
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Recentmessage;
