import { create } from "zustand";
import {persist} from "zustand/middleware"
import { NoteTag } from "@/types/note";


export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
      {
          name: "note-draft",
       partialize: (state) => ({ draft:state.draft})
     },
  ),
);