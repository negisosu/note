import { Note } from "@/types/note"
import { Card } from "../ui/card"
import { Notebook } from "lucide-react"
import Link from "next/link"
import { DateFormat } from "@/lib/utils"

type NoteTableProps = {
    notes: Note[]
}

export function NoteTable({ notes }: NoteTableProps) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
            <Card className="grid grid-cols-4 gap-2 p-2 aspect-4/1 sm:aspect-2/1 hover:bg-accent hover:text-accent-foreground transition-all">
                <div className=" col-span-1 h-full w-full flex items-center justify-center">
                    <Notebook size={30}/>
                </div>
                <div className=" col-span-3 flex flex-col h-full text-ellipsis overflow-hidden">
                    <div className="h-2/3 flex items-center">
                        <span className=" font-semibold text-2xl border-b">{note.title || "a"}</span>
                    </div>
                    <div className="h-1/3 flex items-end justify-end">
                        <span className="text-muted-foreground text-xs">作成日:{DateFormat(note.createdAt)}</span>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

