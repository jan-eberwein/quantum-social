import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    Textarea,
} from "@/components/ui";
import { PostValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { FileUploader } from "@/components/shared";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/lib/appwrite/api";

type PostFormProps = {
    post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useUserContext();
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    });

    async function onSubmit(values: z.infer<typeof PostValidation>) {
        const newPost = await createPost({
            ...values,
            userId: user.id,
        })

        if (!newPost) {
            toast({
                title: "Post failed, please try again!",
            })
        }

        navigate('/');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-9 w-full  max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;