'use client'
import Animated from 'react-native-reanimated'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { ReactNode } from 'react'

import { AppSidebar } from '@components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@components/ui/breadcrumb'
import { Separator } from '@components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@components/ui/sidebar'

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '350px',
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset className="overflow-x-hidden">
                <header className="sticky z-1 top-0 flex shrink-0 items-center gap-2 border-b  border-header bg-header-main/70  backdrop-blur-xs p-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    All Inboxes
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Inbox</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-2">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
