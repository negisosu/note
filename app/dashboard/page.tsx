import { SessionIcon } from "@/components/elements/SessionIcon";
import { getServerSession } from "@/lib/auth-server";
import { Button } from "@/components/ui/button";
import { createEmptyNoteAction } from "@/actions/note";

export default async function Page() {

    const session = await getServerSession()

    return(
        <div>
            dashboard
            <form action={createEmptyNoteAction}>
                <Button type="submit">新規ノート作成</Button>
            </form>
            <SessionIcon session={session}/>
        </div>
    )
}
