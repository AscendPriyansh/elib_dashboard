import { AppSidebar } from "@/components/ui/app-sidebar"
import { SiteHeader } from "@/components/ui/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
// import { Navigate } from "react-router"
// import useTokenStore from "@/store"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

function DashboardLayout() {
    // const token = useTokenStore(state => state.token);

    // if(!token) {
    //     return <Navigate to={"/auth/login"} replace/>
    // }

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <Outlet />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default DashboardLayout;