import Tiptap from "@/components/elements/Tiptap/Tiptap"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { JSONContent } from "@tiptap/react"
import { updateNoteBodyAction } from "@/actions/note"

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
    })

    if(!note){
        notFound()
    }

    const updateNoteBody = async (body: JSONContent) => {
        "use server"

        await updateNoteBodyAction({ id: id, body: body })
    }

    return(
        <>
            <div>{note.title}</div>
            <Tiptap
            defaultValue={note.body as JSONContent}
            updateNoteBody={updateNoteBody}
            />
        </>
    )
}
