import { useEffect, useState } from "react";
import { BlogForm } from "./BlogForm";
import { Post } from "./Post";
import { HoverPlayerWrapper } from "../lib/HoverPlayer";
import defaultPosts from "../mocks/Posts.json";
import { PostType } from "../types/Post";

const BlogContainer = () => {
  const [posts, setPosts] = useState<Array<PostType>>(defaultPosts);

  const addPost = (title: PostType["title"], content: PostType["content"]) => {
    setPosts([...posts, { title, content, id: Date.now().toString() }]);
  };

  const deletePost = (id: PostType["id"]) => {
    setPosts(posts.filter((post) => `${post.id}` !== id));
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (posts.length > 0) {
        event.preventDefault();
        event.returnValue = ""; // for modern browsers
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        CSS.highlights.clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [posts]);

  return (
    <div>
      <BlogForm onAddPost={addPost} />
      {posts.length > 0 ? (
        <HoverPlayerWrapper>
          {posts.map((post) => (
            <div key={post.id}>
              <Post {...post} onDelete={deletePost} />
            </div>
          ))}
        </HoverPlayerWrapper>
      ) : (
        <p>No posts yet. Create one above!</p>
      )}
    </div>
  );
};

export default BlogContainer;
