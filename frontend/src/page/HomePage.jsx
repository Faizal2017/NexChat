import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  const io = new Server(server, {
    cors: {
      // Allow connections from both development and production URLs
      origin: (origin, callback) => {
        // Accept all origins for now to handle localhost and production deployment
        callback(null, true);
        // For more security, you could use: ["http://localhost:5173", "https://your-prod-domain.com"]
      },
      credentials: true,
    },
  });

  return (
    <div className="min-h-[100dvh] bg-base-200">
      <div className="flex items-center justify-center pt-16 md:pt-20 px-2 sm:px-4">
        <div className="bg-base-100 rounded-none sm:rounded-lg shadow-cl w-full max-w-6xl h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)]">
          {/* Desktop/Tablet layout (md and up): sidebar + chat side by side */}
          <div className="hidden md:flex h-full rounded-none sm:rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

          {/* Mobile layout (below md): show only one pane at a time */}
          <div className="block md:hidden h-full rounded-none sm:rounded-lg overflow-hidden">
            {!selectedUser ? (
              // List view occupies full width
              <div className="h-full flex">
                <Sidebar />
              </div>
            ) : (
              // Chat view occupies full width
              <div className="h-full flex">
                <ChatContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

origin: ["http://localhost:5173", "https://nexchat-lx5r.onrender.com/"];
