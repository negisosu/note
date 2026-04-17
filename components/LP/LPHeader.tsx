import { getServerSession } from "@/lib/auth-server"
import { SignInButton } from "../elements/SignInButton"
import { Button } from "../myui/button"
import { ArrowRight } from "lucide-react"

export async function LPHeader() {

    const session = await getServerSession()

    return(
        <header className="w-full h-20 border-b border-neutral-200 shadow-xs flex justify-between">
            <div className="w-64">
                a
            </div>
            <div className="w-64 flex items-center justify-center">
                {session ? (
                    <Button endIcon={ArrowRight}>
                        ダッシュボードへ
                    </Button>
                ) : (
                    <SignInButton/>
                )}
            </div>
        </header>
    )
}