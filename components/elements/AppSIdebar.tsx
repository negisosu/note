import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarRail } from "../ui/sidebar";
import { Home, Settings, type LucideIcon } from "lucide-react";
import { SessionIcon } from "./SessionIcon";
import { getServerSession } from "@/lib/auth-server";

interface LinksItem {
    label: string;
    icon: LucideIcon;
    url: string;
}

const links: LinksItem[] = [
    {
        label: "ホーム",
        icon: Home,
        url: "/dashboard"
    },
    {
        label: "設定",
        icon: Settings,
        url: "/dashboard/settings"
    }
]

export async function AppSidebar() {

    const session = await getServerSession()

    return(
        <Sidebar collapsible="icon">
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {links.map((item) => (
                            <SidebarMenuButton asChild key={item.label}>
                                <Link href={item.url}>
                                    <item.icon/>
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupLabel className="w-full flex justify-center">
                        {session?.user.email}
                    </SidebarGroupLabel>
                    <div className="w-full flex justify-center">
                        <SessionIcon session={session}/>
                    </div>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}