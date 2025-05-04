import { useEffect, useState } from "react";
import { UseSavePost } from "./savePost.types";
import { GetFetch } from "../../Utils/Fetch/fetch";
import { useAppSelector } from "../../hook/useAppSelector";
import { Post } from "../CardPost/CardPost.types";

export const useSavePost = (): UseSavePost => {
  const [savePosts, setSavePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchSavedPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetFetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/saved-posts/${
            user.id
          }`,
          token
        );
        if (response && response.data) {
          setSavePosts(response.data);
        } else {
          setSavePosts([]);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setError("Error fetching saved posts");
        setSavePosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [user?.id, token]);

  return {
    savePosts,
    setSavePosts,
    loading,
    error,
    selectedPost,
    setSelectedPost,
    showModal,
    setShowModal,
  };
};