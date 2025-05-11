import { useState, useEffect } from 'react';
import { Post, UseNewPostHook } from './CardPost.types';
import { GetFetch, PatchFetch } from '../../Utils/Fetch/fetch';
import { useAppSelector } from '../../hook/useAppSelector';
import { toast } from "react-toastify";

export const useNewPostHook = (): UseNewPostHook => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [savedPosts, setSavedPosts] = useState<{ [key: string]: boolean }>({});

  const [showModal, setShowModal] = useState<boolean>(false);
  const [openCommentsPost, setOpenCommentsPost] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const user = useAppSelector((state) => state.user);
  const [postId, setPostId] = useState<string>("");

  const getPosts = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      if (!token)
        throw new Error("No authentication token found, please log in.");

      const [postsData, likeData] = await Promise.all([
        GetFetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev-get`, token),
        GetFetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${
            user.id
          }/liked-posts`,
          token
        ),
      ]);

      const likedPostsState: { [key: string]: boolean } = {};
      const savedPostsState: { [key: string]: boolean } = {};

      likeData.likedPostIds.forEach((id: string) => {
        likedPostsState[id] = true;
      });

      const savePromises = postsData.map((post: Post) =>
        GetFetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${post._id}/${
            user.id
          }/save`,
          token
        ).then((saveData) => {
          savedPostsState[post._id] = saveData.savedPostIds.includes(post._id);
        })
      );

      await Promise.all(savePromises);

      setPosts(postsData);
      setLikedPosts(likedPostsState);
      setSavedPosts(savedPostsState);
    } catch (error) {
      setError((error as Error).message || "Error fetching posts");
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

  const handleSavePost = async (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ): Promise<void> => {
    event.stopPropagation();
    try {
      if (!token)
        throw new Error("No authentication token found, please log in.");

      const isSaved = savedPosts[postId] || false;

      setSavedPosts((prevState) => ({
        ...prevState,
        [postId]: !isSaved,
      }));

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, savePost: !isSaved } : post
        )
      );

      await PatchFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${postId}/save`,
        token,
        {
          user_id: user.id,
        }
      );

      if (isSaved) {
        toast.info("Post eliminado de guardados");
      } else {
        toast.success("Post guardado correctamente");
      }
    } catch (error) {
      console.error("Error al guardar/desguardar el post:", error);
      toast.error("Error al actualizar el estado del post");
    }
  };

  const handleLikePost = async (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ): Promise<void> => {
    event.stopPropagation();
    try {
      if (!token)
        throw new Error("No authentication token found, please log in.");

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
    let mounted = true;

    const fetchData = async () => {
      if (mounted) {
        await getPosts();
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
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
    handleSavePost,
    savedPosts,
  };
};