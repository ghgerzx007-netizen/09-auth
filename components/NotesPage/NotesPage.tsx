"use client"
import { useState } from "react";
import css from "../App/App.module.css";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";

import { useDebounce } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Link from "next/link";

export default function App() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const {
    data: fetchNotesResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", page, debouncedSearchValue],
    queryFn: () => fetchNotes(page, debouncedSearchValue),
    placeholderData: keepPreviousData,
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
