import { X, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, typingByUserId } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70 min-h-[1.25rem]">
              {typingByUserId[selectedUser._id]
                ? "Typing..."
                : onlineUsers.includes(selectedUser._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Back/Close controls */}
        <div className="flex items-center">
          {/* Back on mobile */}
          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setSelectedUser(null)}
            aria-label="Back"
            title="Back"
          >
            <ArrowLeft className="size-5" />
          </button>
          {/* Close on md+ (kept for parity) */}
          <button
            className="hidden md:inline-flex btn btn-ghost btn-sm"
            onClick={() => setSelectedUser(null)}
            aria-label="Close"
            title="Close"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
