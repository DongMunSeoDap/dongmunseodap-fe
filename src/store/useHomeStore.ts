import { create } from "zustand";

interface HomeState {
  bannerIndex: number;
  setBannerIndex: (i: number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  bannerIndex: 0,
  setBannerIndex: (i) => set({ bannerIndex: i }),
}));
