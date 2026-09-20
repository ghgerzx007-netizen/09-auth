"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Notes.module.css";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };
  const normalizedTag = tag && tag !== "all" ? tag : undefined;
  const {
    data: fetchNotesResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", page, debouncedSearchValue, normalizedTag],
    queryFn: () => fetchNotes(page, debouncedSearchValue, normalizedTag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred.</div>;
  }
  const notes = fetchNotesResponse?.notes ?? [];
  const totalPages = fetchNotesResponse?.totalPages ?? 1;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox searchValue={searchValue} onSearch={handleSearch} />
          {!isLoading && !isError && totalPages > 1 && (
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
          )}
          <Link href="/notes/action/create" className={css.link}>
            Create note +
          </Link>
        </header>

        {notes.length === 0 && !isLoading && !isError ? (
          <p className={css.noNotes}>No notes found.</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
    </>
  );
}
