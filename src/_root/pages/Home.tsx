import { Models } from "appwrite";
import { Loader } from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import PostCard from "@/components/shared/PostCard";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
  } = useGetRecentPosts();

  return (
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            {isPostLoading && !posts ? (
                <Loader />
            ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full ">
                  {posts?.documents.map((post: Models.Document) => (
                      <PostCard post={post} key= {post.caption}/>
                  ))}
                </ul>
            )}
          </div>
        </div>
      </div>
  );
};

export default Home;