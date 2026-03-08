import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

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

    console.log(note)

    return(
        <div>
            {note.id}
        </div>
    )
}