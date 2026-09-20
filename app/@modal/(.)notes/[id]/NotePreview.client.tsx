"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <button type="button" onClick={() => router.back()}>
          Close
        </button>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={() => router.back()}>
        <button type="button" onClick={() => router.back()}>
          Close
        </button>
        <p>{error instanceof Error ? error.message : "Error loading note"}</p>
      </Modal>
    );
  }

  if (!data) {
    return (
      <Modal onClose={() => router.back()}>
        <button type="button" onClick={() => router.back()}>
          Close
        </button>
        <p>Note not found</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <button type="button" onClick={() => router.back()}>
        Close
      </button>
      <article>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>{data.tag}</p>
        <p>Created at: {data.createdAt}</p>
      </article>
    </Modal>
  );
}