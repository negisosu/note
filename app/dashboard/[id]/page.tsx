import { NoteFormContainer } from "@/components/Note/NoteFormContainer"

interface PageProps {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageProps) {

    const id = (await params).id

    return(
        <NoteFormContainer id={id}/>
    )
}
