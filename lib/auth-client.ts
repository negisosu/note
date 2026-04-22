import { createAuthClient } from "better-auth/client";
import { redirect } from "next/navigation";

export const authClient = createAuthClient()

export const signIn = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
    })
}

export const signOut = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                redirect("/")
            }
        }
    })
}

export const getClientSession = async () => {
    return authClient.getSession()
}
