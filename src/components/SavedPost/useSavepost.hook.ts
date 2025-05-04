import { useEffect, useState } from "react";
import { SavePost, UseSavePost } from "./savePost.types";
import { GetFetch } from "../../Utils/Fetch/fetch";
import { useAppSelector } from "../../hook/useAppSelector";

export const useSavePost = (): UseSavePost => {
  const [savePosts, setSavePosts] = useState<SavePost[]>([]);
  const user = useAppSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!user?.id) {
        console.error("No user ID found");
        return;
      }
      if (!token) {
        throw new Error("No authentication token found, please log in.");
      }
      try {
        const response = await GetFetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${user.id}/save`,
          token
        );
        console.log(response);
        setSavePosts(response);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, [user.id]);
  return {
    savePosts,
    setSavePosts,
  };
};
