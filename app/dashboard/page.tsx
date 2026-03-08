import { SessionIcon } from "@/components/elements/SessionIcon";
import { getServerSession } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

async function createEmptyNote() {
    "use server";

    const session = await getServerSession();
    if (!session) {
        redirect("/sign-in");
    }

    const note = await prisma.note.create({
        data: {
            title: "",
            body: "",
        },
    });

    redirect(`/dashboard/${note.id}`);
}

export default async function Page() {

    const session = await getServerSession()

    return(
        <div>
            dashboard
            <form action={createEmptyNote}>
                <Button type="submit">新規ノート作成</Button>
            </form>
            <SessionIcon session={session}/>
        </div>
    )
}
