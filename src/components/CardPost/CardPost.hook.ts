import { useState, useEffect } from "react";
import { Post, UseNewPostHook } from "./CardPost.types";
import { GetFetch, PatchFetch } from "../../Utils/Fetch/fetch";
import { useAppSelector } from "../../hook/useAppSelector";

export const useNewPostHook = (): UseNewPostHook => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openCommentsPost, setOpenCommentsPost] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const user = useAppSelector((state) => state.user);
  const [postId, setPostId] = useState<string>("");

  const getPosts = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error("No authentication token found, please log in.");
      }
      const data = await GetFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post-dev-get`,
        token
      );

      const likedPostsState: { [key: string]: boolean } = {};
      await Promise.all(
        data.map(async (post: Post) => {
          const likeData = await GetFetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/post-dev-total-likes/${
              post._id
            }/${user.id}/like`,
            token
          );
          likedPostsState[post._id] = likeData.liked || false;
        })
      );

      setPosts(data);
      setLikedPosts(likedPostsState);
    } catch (error) {
      setError(error.message || "Error fetching posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCommentModal = (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string,
    open: boolean
  ) => {
    event.stopPropagation();
    setPostId(postId);
    setOpenCommentsPost(open);
  };

  const handleLikePost = async (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ): Promise<void> => {
    event.stopPropagation();
    try {
      if (!token) {
        throw new Error("No authentication token found, please log in.");
      }

      const isLiked = likedPosts[postId] || false;

      setLikedPosts((prevState) => ({
        ...prevState,
        [postId]: !isLiked,
      }));

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, total_likes: post.total_likes + (isLiked ? -1 : 1) }
            : post
        )
      );
      await PatchFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${postId}/like`,
        token,
        {
          user_id: user.id,
        }
      );
    } catch (error) {
      console.error("Error al dar like/unlike al post:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return {
    postId,
    posts,
    openCommentsPost,
    setOpenCommentsPost,
    loading,
    error,
    getPosts,
    likedPosts,
    handleLikePost,
    setShowModal,
    handleOpenCommentModal,
    showModal,
  };
};
