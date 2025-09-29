import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  typingByUserId: {}, // { [userId]: boolean }

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      // Send the message to the server
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // We ALWAYS want to display our own sent messages immediately
      // No need to wait for socket events for our own messages

      // Add the new message to the local state
      // First check if it's not already there (though it shouldn't be)
      const messageExists = messages.some((msg) => msg._id === res.data._id);
      if (!messageExists) {
        set({ messages: [...messages, res.data] });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  //listening to new messages from socket that is send by user
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket; // get the socket from auth store

    socket.on("newMessage", (newMessage) => {
      const currentUserId = useAuthStore.getState().authUser?._id;

      // Only process messages if we're the receiver (not the sender)
      // And the message is either from or to the currently selected user
      if (
        newMessage.receiverId === currentUserId &&
        newMessage.senderId === selectedUser._id
      ) {
        // Check if the message already exists in our state
        const messageExists = get().messages.some(
          (msg) => msg._id === newMessage._id
        );

        if (!messageExists) {
          set({
            messages: [...get().messages, newMessage],
          });
        }
      }
    });

    // typing indicator from selected user
    socket.on("userTyping", ({ senderId, isTyping }) => {
      if (senderId !== selectedUser._id) return;
      set({
        typingByUserId: { ...get().typingByUserId, [senderId]: !!isTyping },
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("userTyping");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
