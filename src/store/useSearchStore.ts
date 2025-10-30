"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SearchState = {
  recent: string[];
  add(term: string): void;
  remove(term: string): void;
  clear(): void;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      recent: [],
      add: (term) => {
        const t = term.trim();
        if (!t) return;
        const uniq = [t, ...get().recent.filter((x) => x !== t)].slice(0, 10);
        set({ recent: uniq });
      },
      remove: (term) => set({ recent: get().recent.filter((x) => x !== term) }),
      clear: () => set({ recent: [] }),
    }),
    {
      name: "search-recent",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
