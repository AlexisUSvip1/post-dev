import { useEffect, useState } from 'react';
import { UseCommentsHook } from './CommentPost.type';
import { GetFetch, PostFetch } from '../../Utils/Fetch/fetch';
import { useAppSelector } from '../../hook/useAppSelector';

export const useCommentsPost = (postId: string) => {
  const [comments, setComments] = useState<UseCommentsHook[]>([]);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responseComment, setResponseComment] = useState<string>('');
  const user = useAppSelector((state) => state.user);

  const getCommentsPost = async (): Promise<void> => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error('No authentication token found, please log in.');
      }
      const data = await GetFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-comment/${postId}`,
        token
      );
      setComments(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Error fetching posts');
        console.error('Error fetching posts:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  const postNewComment = async (): Promise<void> => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error('No authentication token found, please log in.');
      }

      const body = {
        body: responseComment,
        user_id: user?.id,
        user_avatar: user.avatar_url,
        userName: user.displayName,
        post_id: postId,
      };
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/post-comment/${postId}`;

      await PostFetch(url, token, body);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Error posting comment');
        console.error('Error posting comment:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    responseComment,
    setResponseComment,
    comments,
    setComments,
    loading,
    error,
    postNewComment,
    getCommentsPost,
  };
};
