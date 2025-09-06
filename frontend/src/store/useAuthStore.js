import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,
}));

//this file is for global state management of auth user information
//we can access user info from any component without prop drilling
//we can update user info from any component and all components will get updated