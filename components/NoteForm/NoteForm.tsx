"use client";

import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/app/store/noteDraftStore";

const Tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
type Tag = (typeof Tags)[number];

interface FormValues {
  title: string;
  content: string;
  tag: Tag;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  
  const title = useNoteDraftStore((s) => s.title);
  const content = useNoteDraftStore((s) => s.content);
  const tag = useNoteDraftStore((s) => s.tag);

  const setTitle = useNoteDraftStore((s) => s.setTitle);
  const setContent = useNoteDraftStore((s) => s.setContent);
  const setTag = useNoteDraftStore((s) => s.setTag);
  const resetDraft = useNoteDraftStore((s) => s.resetDraft);

  const createNoteMutation = useMutation({
    mutationFn: (newNote: FormValues) => createNote(newNote),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      resetDraft();
      router.push("/notes/filter/all");
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required("Title is required")
      .min(3, "Min 3 characters")
      .max(50, "Max 50 characters"),
    content: Yup.string().max(500, "Max 500 characters"),
    tag: Yup.mixed<Tag>().oneOf(Tags).required("Tag is required"),
  });
  const handleFormAction = async (formData: FormData): Promise<void> => {
    const rawTitle = String(formData.get("title") ?? "");
    const rawContent = String(formData.get("content") ?? "");
    const rawTag = String(formData.get("tag") ?? "") as Tag;


    const payload: FormValues = {
      title: rawTitle.trim(),
      content: rawContent.trim(),
      tag: rawTag,
    };
    try {
      await validationSchema.validate(payload, { abortEarly: false });
      createNoteMutation.mutate(payload);
    } catch {
      
    }
  };

  return (
    <form className={css.form} action={handleFormAction}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as Tag)}
        >
          {Tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
          disabled={createNoteMutation.isPending}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
} 