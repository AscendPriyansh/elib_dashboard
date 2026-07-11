import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CircleX, SendHorizontal } from "lucide-react";
import { Link } from "react-router";

function CreateBook() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/dashboard/home">
                                DashBoard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/dashboard/books">
                                Books
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create Book</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between gap-2">
                    <Link to="/dashboard/books/create">
                        <Button type="button" variant={"outline"}><CircleX />Cancel</Button>
                    </Link>
                    <Link to="/dashboard/books/create">
                        <Button type="button" variant={"default"}><SendHorizontal />Submit</Button>
                    </Link>
                </div>
            </div>
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min flex flex-col justify-center items-center gap-3">
            </div>
        </div>
    )
}


export default CreateBook;