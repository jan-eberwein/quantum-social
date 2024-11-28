import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../appwrite/api";
import GridPostList from "./GridPostList";

const UserPosts = ({ userId }: { userId: string }) => {
    const { data, isLoading, error } = useQuery(["userPosts", userId], () =>
        getPostsByUser(userId)
    );

    if (isLoading) {
        return <p className="text-light-4 mt-10 text-center w-full">Loading...</p>;
    }

    if (error || !data || data.documents.length === 0) {
        return (
            <p className="text-light-4 mt-10 text-center w-full">
                This user has no posts.
            </p>
        );
    }

    return <GridPostList posts={data.documents} />;
};

export default UserPosts;
