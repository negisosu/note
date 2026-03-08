import { AppSidebar } from "@/components/elements/AppSIdebar";
import { PageContainer } from "@/components/elements/PageContainer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession()

    if(!session){
        redirect("/")
    }

    return (
    <>
        <SidebarProvider>
            <AppSidebar/>
                <PageContainer>
                    {children}
                </PageContainer>
        </SidebarProvider>
    </>
    );
}
