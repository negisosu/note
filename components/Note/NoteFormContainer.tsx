import { NoteTitleInput } from "./NoteTitleInput";
import Tiptap from "../elements/Tiptap/Tiptap";
import { getNoteById, updateNoteBodyAction, updateNoteTitleAction } from "@/actions/note";
import { Separator } from "../ui/separator";
import { notFound } from "next/navigation";

type NoteFormContainerProps = {
    id: string
}

export async function NoteFormContainer({ id }: NoteFormContainerProps) {

    const note = await getNoteById({ id })

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