"use client";

import type { CreateNotePayload, Note } from "../../types/note.ts";
import type { User } from "../../types/user.ts";
import { api } from "./api";

export interface NotesParams {
  perPage?: number;
  page?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type SessionResponse = User;

export interface UpdateProfilePayload {
  username: string;
}

type AuthResponse = User;

export const fetchNotes = async (
  page?: number,
  search?: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const normalizedTag = tag && tag !== "all" ? tag : undefined;

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      perPage: 12,
      page,
      search,
      tag: normalizedTag,
    } as NotesParams,
  });

  return data;
};

export const createNote = async (
  noteData: CreateNotePayload,
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  const { data } = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};

export const checkSession = async (): Promise<SessionResponse> => {
  const { data } = await api.get<SessionResponse>("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const updateProfile = async (
  userData: UpdateProfilePayload,
): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", userData);
  return data;
};
