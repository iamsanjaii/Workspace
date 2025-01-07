import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthstore";
import axios from "axios";
import { peer } from "./webtrc";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,
  Roomid: null,
  error: null,  
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/message/user');
      set({ users: res.data });
    } catch (error) {
      set({ error: "Failed to fetch users" });
      console.log('Error in Getting Users', error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      set({ error: "Failed to fetch messages" });
      console.error("Error in getting messages:", error);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      console.log("No selected user");
      return;
    }

    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("Error in Sending message", error);
    }
  },

  listenMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on('newMessage', (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unlistenMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  creatNewMeet: async () => {
    try {
      const res = await axios.get('http://localhost:4700/newmeet');
      set({ Roomid: res.data.roomid });
      console.log('Room ID:', res.data.roomid);
      const socket = useAuthStore.getState().socket;
      peer.on('open', id => {
        console.log('Peer ID:', id); 
        const socket = useAuthStore.getState().socket;
        socket.emit('join-meet', roomId, id);
      });
    
      socket.on('user-connected', (userId) => {
        console.log('User connected:', userId);
      });
    } catch (error) {
      console.error('Error creating new meet:', error);
    }
  }
  
}));
