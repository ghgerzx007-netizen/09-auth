import { create } from "zustand";

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface NoteDraftState {
  title: string;
  content: string;
  tag: Tag;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setTag: (value: Tag) => void;
  resetDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftState>((set) => ({
  title: "",
  content: "",
  tag: "Todo",
  setTitle: (value) => set({ title: value }),
  setContent: (value) => set({ content: value }),
  setTag: (value) => set({ tag: value }),
  resetDraft: () => set({ title: "", content: "", tag: "Todo" }),
}));