import { cookies } from "next/headers";
import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { FetchNotesResponse, NotesParams } from "./clientApi";

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

export const fetchNoteById = async (id: string): Promise<Note> => {
  return (await api.get<Note>(`/notes/${id}`)).data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const res = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
