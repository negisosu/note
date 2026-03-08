"use client"

import { useDebouncedCallback } from "use-debounce";
import { Note } from "@/types/note";
import clsx from "clsx";

interface NoteTitleInputProps {
    note: Note,
    updateNoteTitle: (input: { id: string, title: string}) => Promise<void>
}

export function NoteTitleInput({ note, updateNoteTitle }: NoteTitleInputProps) {
    return(
        <input
        type="text"
        className={clsx(
            // inputのデフォルトスタイルを消す
            "border-0 bg-transparent outline-none ring-0 shadow-none focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none",
            "w-full text-4xl"
        )}
        defaultValue={note.title}
        placeholder="タイトルを入力"
        onChange={useDebouncedCallback((e) => {
            void updateNoteTitle({ id: note.id, title: e.target.value })
        }, 1200)}
        />
    )
}
