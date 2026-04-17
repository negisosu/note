import { getServerSession } from "@/lib/auth-server";
import { Button } from "@/components/myui/button";
import { createEmptyNoteAction } from "@/actions/note";
import { redirect } from "next/navigation";
import { NoteTableContainer } from "@/components/Note/NoteTableContainer";

export default async function Page() {

    const session = await getServerSession()

    if(!session) {
        redirect("/")
    }

    return(
        <div>
            dashboard
            <form action={createEmptyNoteAction}>
                <Button type="submit">新規ノート作成</Button>
            </form>
            <NoteTableContainer/>
        </div>
    )
}
