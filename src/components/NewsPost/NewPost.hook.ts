import { useState, useEffect } from 'react';
import { Post, UseNewPostHook } from './NewPost.types';
import { GetFetch } from '../../Utils/Fetch/fetch';

export const useNewPostHook = (): UseNewPostHook => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPosts = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found, please log in.');
      }
      const data = await GetFetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev-get`, token);
      setPosts(data);
    } catch (error) {
      setError(error.message || 'Error fetching posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return { posts, loading, error, getPosts };
};
