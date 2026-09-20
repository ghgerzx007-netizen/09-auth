import NoteForm from "@/components/NoteForm/NoteForm"
import css from "./CreateNote.module.css"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub and continue from your saved draft.",
   openGraph: {
    title: 'Create Note | NoteHub',
     description: 'Create a new note in NoteHub and continue from your saved draft.',
    url: "https://notehub.com/notes/action/create",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 683,
      alt: "Preview image"
    }],
  }
};
export default function CreateNotePage() {
    return <>
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm />
  </div>
</main>
</>
}

    
