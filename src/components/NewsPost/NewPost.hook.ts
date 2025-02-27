import { useState, useEffect } from "react";

export const useNewPostHook = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewPost, setViewPost] = useState<boolean>(false)
  // URL del backend con variable de entorno

  const getPosts = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found, please log in.");
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev-get`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching posts");
      }

      const data = await response.json();
      setPosts(data); // Guardar los posts en el estado
    } catch (error) {
      setError(error.message);
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Llamar la función al montar el componente
  useEffect(() => {
    getPosts();
  }, []);

  return { posts, loading, error, getPosts,setViewPost };
};