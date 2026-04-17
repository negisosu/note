import { Note } from "@/types/note"
import { Card } from "../ui/card"
import { Notebook } from "lucide-react"
import Link from "next/link"

type NoteTableProps = {
    notes: Note[]
}

export function NoteTable({ notes }: NoteTableProps) {
    return(
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {notes.map((note) => <NoteTableCard key={note.id} note={note}/>)}
        </div>
    )
}

type NoteTableCardProps = {
    note: Note
}

export function NoteTableCard({ note }: NoteTableCardProps) {
    return(
        <Link href={`/dashboard/${note.id}`}>
            <Card className="grid grid-cols-4 gap-2 p-2 aspect-2/1 hover:bg-accent hover:text-accent-foreground transition-all">
                <div className=" col-span-1 h-full w-full flex items-center justify-center">
                    <Notebook size={30}/>
                </div>
                <div className=" col-span-3 flex items-center text-ellipsis overflow-hidden">
                    {note.title}
                </div>
            </Card>
        </Link>
    )
}

