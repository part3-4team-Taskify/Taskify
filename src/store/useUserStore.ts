import { create } from "zustand";

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
}

interface UserState {
  user: UserInfo | null;
  isInitialized: boolean;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user) => set({ user, isInitialized: true }),
  clearUser: () => set({ user: null, isInitialized: true }),
}));

export default useUserStore;
