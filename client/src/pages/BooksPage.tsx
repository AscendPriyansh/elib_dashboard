import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getBooks, deleteBook } from '@/http/api';
import type { Book } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, LoaderCircle, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const getPageNumbers = (current: number, total: number): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
    return pages;
};

const BooksPage = () => {
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', currentPage],
        queryFn: () => getBooks(currentPage, limit),
        staleTime: 10000,
    });

    const totalPages = data?.data?.pagination?.totalPages ?? 1;

    const deleteMutation = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });

    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

    const handleDelete = (bookId: string) => {
        if (confirm('Are you sure you want to delete this book?')) {
            deleteMutation.mutate(bookId);
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link to="/dashboard/home">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                <Link to="/dashboard/books">Book</Link>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link to="/dashboard/books/create">
                    <Button>
                        <CirclePlus size={20} />
                        <span className="ml-2">Add book</span>
                    </Button>
                </Link>
            </div>

            {isLoading ? <div className="flex flex-1 flex-col gap-4">
                <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-1 items-center justify-center p-4"><LoaderCircle className="animate-spin size-8" /></div>
                    </div>
                </div>
            </div> :
                isError ? <div className="flex flex-1 flex-col gap-4">
                    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min flex flex-col justify-center items-center gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="font-bold text-lg text-red-700 opacity-70">An Error Occured.</h3>
                        </div>

                    </div>
                </div> : (data && data?.data?.books?.length > 0) ? <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Books</CardTitle>
                        <CardDescription>
                            Manage your books and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden md:table-cell">Images</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Genre</TableHead>
                                    <TableHead className="hidden md:table-cell">Author name</TableHead>
                                    <TableHead className="hidden md:table-cell">Created at</TableHead>
                                    <TableHead className="hidden md:table-cell">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            <LoaderCircle className="animate-spin inline-block" />
                                            <span className="ml-2">Loading books...</span>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {isError && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-destructive">
                                            Failed to load books: {(error as Error)?.message}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {data?.data?.books?.map((book: Book) => {
                                    return (
                                        <TableRow key={book._id}>
                                            <TableCell className="hidden sm:table-cell">
                                                {imgErrors[book._id] ? (
                                                    <div className="aspect-square rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs" style={{ width: 64, height: 64 }}>
                                                        No img
                                                    </div>
                                                ) : (
                                                    <img
                                                        alt={book.title}
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src={book.coverImage}
                                                        width="64"
                                                        onError={() => setImgErrors(prev => ({ ...prev, [book._id]: true }))}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">{book.title}</TableCell>
                                            <TableCell>
                                                <Badge variant={"default"}>{book.genre}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {book.author?.name ?? 'Unknown'}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {new Date(book.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Link to={`/dashboard/books/${book._id}`}>
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(book._id)}>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) ?? []}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground w-full">
                            <div>
                                Showing <strong>{data?.data?.books?.length ?? 0}</strong> book(s)
                                {data?.data?.pagination && (
                                    <span> — Page <strong>{data.data.pagination.currentPage}</strong> of <strong>{data.data.pagination.totalPages}</strong></span>
                                )}
                            </div>
                            <div className='mt-2'>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                                                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                                            />
                                        </PaginationItem>
                                        {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                                            page === '...' ? (
                                                <PaginationItem key={`ellipsis-${idx}`}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            ) : (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={page === currentPage}
                                                        onClick={(e) => { e.preventDefault(); setCurrentPage(page as number); }}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                                                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </CardFooter>
                </Card> : <div className="flex flex-1 flex-col gap-4">
                    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min flex flex-col justify-center items-center gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="font-bold text-lg">You have no books</h3>
                            <p className="text-xs text-gray-400">You can start selling as soon as you add a book.</p>
                        </div>
                        <Button type="button">Add Book</Button>
                    </div>
                </div>}

        </div>
    );
};

export default BooksPage;