'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import { PlaceholderExtension } from './extensions/Placeholder'
import '@/app/tiptap.css'
import '@/app/markdown.css'
import { useDebouncedCallback } from "use-debounce"
import type { Note } from '@/types/note'
import type { JSONContent } from "@tiptap/core"

interface TiptapProps {
    note: Note
    updateNoteBody: (input: { id: string; body: JSONContent }) => Promise<void>
}

const Tiptap = ({ note, updateNoteBody }: TiptapProps) => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // 見出しを1~3に制限
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            PlaceholderExtension,
            BubbleMenu
        ],
        content: note.body as JSONContent,
        // Don't render immediately on the server to avoid SSR issues
        // 直訳: SSRの問題を回避するためにサーバー上ですぐにレンダリングしないでください
        immediatelyRender: false,
        onUpdate: useDebouncedCallback(({ editor }: { editor: Editor }) => {
            const body = JSON.parse(JSON.stringify(editor.getJSON())) as JSONContent
            void updateNoteBody({ id: note.id, body })
        }, 1200)
    })

    return <>
        <EditorContent
            editor={editor}
            className="tiptap markdown-body min-w-full"
        />
    </>
}

export default Tiptap
