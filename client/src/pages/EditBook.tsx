import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { getSingleBook, updateBook } from '@/http/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CircleCheck, CircleX, LoaderCircle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters.',
    }),
    genre: z.string().min(2, {
        message: 'Genre must be at least 2 characters.',
    }),
    coverImage: z.instanceof(FileList).optional(),
    file: z.instanceof(FileList).optional(),
});

const EditBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const { data: bookRes, isLoading } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => getSingleBook(bookId!),
        enabled: !!bookId,
    });

    const book = bookRes?.data?.book;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: book && {
            title: book.title,
            description: book.description,
            genre: book.genre,
        },
    });

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            console.log('Book Updated successfully');
            navigate('/dashboard/books');
        },
        onError: (error) => {
            console.error('Edit book failed:', error);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const msg = (error as any)?.response?.data?.message || (error as Error).message;
            alert(`Failed to edit book: ${msg}`);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formdata = new FormData();
        formdata.append('title', values.title);
        formdata.append('genre', values.genre);
        formdata.append('description', values.description);
        if (values.coverImage?.[0]) {
            formdata.append('coverImage', values.coverImage[0]);
        }
        if (values.file?.[0]) {
            formdata.append('file', values.file[0]);
        }

        mutation.mutate({ bookId: bookId!, data: formdata });
    }

    if (isLoading) return <div className="flex flex-1 items-center justify-center p-4"><LoaderCircle className="animate-spin size-8" /></div>;

    return (
        <section className="flex flex-1 flex-col gap-4 p-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-2">
                            <Link to="/dashboard/books">
                                <Button variant={'outline'}>
                                    <CircleX />Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <LoaderCircle className="animate-spin" />}
                                <CircleCheck />Submit
                            </Button>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className='text-2xl font-semibold'>Edit existing book</CardTitle>
                            <CardDescription>
                                Fill out the form below to edit book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                            <Field>
                                <FieldContent>
                                    <FieldLabel>Title</FieldLabel>
                                    <FieldGroup>
                                        <Input type="text" className="w-full" {...form.register('title')}/>
                                    </FieldGroup>
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.title.message}
                                        </p>
                                    )}
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel>Genre</FieldLabel>
                                    <FieldGroup>
                                        <Input type="text" className="w-full" {...form.register('genre')} />
                                    </FieldGroup>
                                    {form.formState.errors.genre && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.genre.message}
                                        </p>
                                    )}
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel>Description</FieldLabel>
                                    <FieldGroup>
                                        <Textarea className="min-h-32" {...form.register('description')} />
                                    </FieldGroup>
                                    {form.formState.errors.description && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.description.message}
                                        </p>
                                    )}
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel>Cover Image</FieldLabel>
                                    <FieldGroup>
                                        <Input
                                            type="file"
                                            className="w-full"
                                            {...coverImageRef}
                                        />
                                    </FieldGroup>
                                    {form.formState.errors.coverImage && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.coverImage.message}
                                        </p>
                                    )}
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel>Book File</FieldLabel>
                                    <FieldGroup>
                                        <Input
                                            type="file"
                                            className="w-full"
                                            {...fileRef}
                                        />
                                    </FieldGroup>
                                    {form.formState.errors.file && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.file.message}
                                        </p>
                                    )}
                                </FieldContent>
                            </Field>
                        </div>
                        </CardContent>
                    </Card>
                </form>
        </section>
    );
};

export default EditBook;