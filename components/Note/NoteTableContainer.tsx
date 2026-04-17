import { getNotes } from "@/actions/note"
import { NoteTable } from "./NoteTable"

export async function NoteTableContainer() {

    const notes = await getNotes()

    return <NoteTable notes={notes || []}/>
}