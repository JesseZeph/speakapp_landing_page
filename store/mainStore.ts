import { create } from "zustand";

interface MainStore {
  pendingRequests: number;
  incrementPendingRequests: () => void;
  decrementPendingRequests: () => void;
}

export const useMainStore = create<MainStore>((set) => ({
  pendingRequests: 0,
  incrementPendingRequests: () => set((state) => ({ pendingRequests: state.pendingRequests + 1 })),
  decrementPendingRequests: () => set((state) => ({ pendingRequests: state.pendingRequests - 1 })),
}));
