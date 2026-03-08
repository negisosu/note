'use client'

import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PlaceholderKit } from './extensions/Placeholder'
import '@/app/tiptap.css'
import '@/app/markdown.css'

interface TiptapProps {
    defaultValue: Content,
}

const Tiptap = ({ defaultValue }: TiptapProps) => {

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
    })

    return <EditorContent
        editor={editor}
        className="tiptap markdown-body min-w-full"
    />
}

export default Tiptap
