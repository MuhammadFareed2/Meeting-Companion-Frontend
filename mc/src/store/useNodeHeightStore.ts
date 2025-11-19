// store/useNodeHeights.ts
import { create } from "zustand";

type NodeHeights = {
  heights: Record<string, number>;
  setHeight: (id: string, height: number) => void;
};

export const useNodeHeights = create<NodeHeights>((set) => ({
  heights: {},
  setHeight: (id, height) =>
    set((state) => ({
      heights: {
        ...state.heights,
        [id]: state.heights[id] ?? height, // Set only once
      },
    })),
}));
