import React from "react";
import PostCard from "./PostCard";
import {posts} from "./PostData";

function UserPost() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-special-red2">
                Post Cards
            </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {posts.map((id, index) => (
                <PostCard key={index} {...id} />
            ))}
            </div>
        </div>
    );
}

export default UserPost;
