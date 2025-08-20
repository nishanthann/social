import { dummyRecentMessagesData } from "../assets/assets";

const RecentMessages = () => {
  // Count unseen messages
  const unseenCount = dummyRecentMessagesData.filter((msg) => !msg.seen).length;

  return (
    <div className="max-w-xs bg-white p-4 rounded-md mt-4 shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-slate-800 font-semibold">Recent Messages</h3>
        {unseenCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unseenCount}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {dummyRecentMessagesData.map((message) => (
          <div
            key={message._id}
            className={`p-3 rounded-md ${
              !message.seen
                ? "bg-blue-50 border-l-4 border-blue-400"
                : "bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <img
                src={message.from_user_id.profile_picture}
                alt={message.from_user_id.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-slate-800">
                  {message.from_user_id.full_name}
                  {!message.seen && (
                    <span className="ml-1 inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  )}
                </p>
                <p
                  className={`text-sm ${
                    !message.seen
                      ? "text-slate-800 font-medium"
                      : "text-slate-500"
                  }`}
                >
                  {message.text.length > 30
                    ? `${message.text.substring(0, 30)}...`
                    : message.text}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
