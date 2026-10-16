// "use client";
// import axios from "axios";
// import type { CreateNotePayload } from "../../types/note.ts";
// import type { Note } from "../../types/note.ts";
// import type { User } from "../../types/user.ts";
// interface NotesParams {
//   perPage?: number;
//   page?: number;
//   search?: string;
//   tag?: string;
// }
// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }
// type LoginResponse = {
//   user: User;
// };

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_NOTEHUB_API_URL,
//   headers: {},
// });
// export const fetchNotes = async (
//   page?: number,
//   search?: string,
//   tag?: string,
// ): Promise<FetchNotesResponse> => {
//   const normalizedTag = tag && tag !== "all" ? tag : undefined;
//   const response = await api.get<FetchNotesResponse>("/notes", {
//     params: {
//       perPage: 12,
//       page,
//       search,
//       tag: normalizedTag,
//     } as NotesParams,
//   });
//   return response.data;
// };
// export const createNote = async (
//   noteData: CreateNotePayload,
// ): Promise<Note> => {
//   return (await api.post<Note>("/notes", noteData)).data;
// };
// export const deleteNote = async (id: string): Promise<Note> => {
//   return (await api.delete<Note>(`/notes/${id}`)).data;
// };
// export const fetchNoteById = async (id: string): Promise<Note> => {
//   return (await api.get<Note>(`/notes/${id}`)).data;
// };
// export const register = async (
//   email: string,
//   password: string,
// ): Promise<void> => {
//   await api.post("/auth/register", { email, password });
// };
// export const login = async (
//   email: string,
//   password: string,
// ): Promise<LoginResponse> => {
//   const { data } = await api.post<LoginResponse>("/auth/login", {
//     email,
//     password,
//   });
//   return data;
// };

"use client";
import axios from "axios";
import type { CreateNotePayload } from "../../types/note.ts";
import type { Note } from "../../types/note.ts";
import type { User } from "../../types/user.ts";
import { cookies } from "next/headers.js";

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

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_API_URL,
  withCredentials: true, 
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

export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", { email, password });
  return data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", { email, password });
  return data;
};
export const checkSession = async (): Promise<void> => {
  await api.get("/auth/session");
};
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.patch<User>("/users/me", userData, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};