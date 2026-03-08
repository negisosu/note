'use client'

import { useEditor, EditorContent, Content, JSONContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PlaceholderKit } from './extensions/Placeholder'
import '@/app/tiptap.css'
import '@/app/markdown.css'
import { useDebouncedCallback } from "use-debounce"

interface TiptapProps {
    defaultValue: Content,
    updateNoteBody: (body: JSONContent) => Promise<void>
}

const Tiptap = ({ defaultValue, updateNoteBody }: TiptapProps) => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            ...PlaceholderKit,
        ],
        content: defaultValue,
        // Don't render immediately on the server to avoid SSR issues
        // 直訳: SSRの問題を回避するためにサーバー上ですぐにレンダリングしないでください
        immediatelyRender: false,
        onUpdate: useDebouncedCallback(({ editor }: { editor: Editor }) => {
            updateNoteBody(editor.getJSON())
        }, 2000)
    })

    return <EditorContent
        editor={editor}
        className="tiptap markdown-body min-w-full"
    />
}

export default Tiptap
