import Tiptap from "@/components/elements/Tiptap/Tiptap"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateNoteBodyAction, updateNoteTitleAction } from "@/actions/note"
import type { Note } from "@/types/note"
import { NoteTitleInput } from "@/components/Note/NoteTitleInput"
import { Separator } from "@/components/ui/separator"

interface PageProps {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageProps) {

    const id = (await params).id

    const note = await prisma.note.findUnique({
        where: {
            id: id
        }
    }) as Note | null

    if(!note){
        notFound()
    }

    return(
        <div className="space-y-8">
            <NoteTitleInput
            note={note}
            updateNoteTitle={updateNoteTitleAction}
            />
            <Separator/>
            <Tiptap
            note={note}
            updateNoteBody={updateNoteBodyAction}
            />
        </div>
    )
}
