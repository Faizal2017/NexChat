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
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // Generate a unique ID for this message or use the ID from response
      const messageId = res.data._id;

      // Check if this message already exists in our messages array
      const messageExists = messages.some((msg) => msg._id === messageId);

      // Only add the message if it doesn't already exist
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
      // Check if this is a message from the selected user to the current user
      // We only want to display messages where current user is the receiver
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      const currentUserId = useAuthStore.getState().authUser?._id;

      // Only handle messages where we're the receiver
      if (
        !isMessageSentFromSelectedUser ||
        newMessage.senderId === currentUserId
      )
        return;

      set({
        messages: [...get().messages, newMessage],
      });
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
