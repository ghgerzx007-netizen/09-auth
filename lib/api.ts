"use client";
import axios from "axios";
import type { CreateNotePayload } from ".././types/note.ts";
import type { Note } from ".././types/note.ts";
interface NotesParams {
  perPage?: number;
  page?: number;
  search?: string;
  tag?: string;
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization:  `Bearer ${token}`
  },
});
export const fetchNotes = async (
  page?: number,
  search?: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const normalizedTag = tag && tag !== "all" ? tag : undefined;
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      perPage: 12,
      page,
      search,
      tag: normalizedTag,
    } as NotesParams,
  });
  return response.data;
};
export const createNote = async (
  noteData: CreateNotePayload,
): Promise<Note> => {
  return (await api.post<Note>("/notes", noteData)).data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  return (await api.delete<Note>(`/notes/${id}`)).data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  return (await api.get<Note>(`/notes/${id}`)).data;
};