import { useState, useEffect } from 'react';
import { Post, UseNewPostHook } from './CardPost.types';
import { GetFetch, PatchFetch } from '../../Utils/Fetch/fetch';
import { useAppSelector } from '../../hook/useAppSelector';
import { toast } from 'react-toastify';
import { removeSavedPost, savePost } from '../../features/Post/postSlice';
import { useDispatch } from 'react-redux';
import { techOptions } from '../../utils/Tags/Tags';

export const useNewPostHook = (): UseNewPostHook => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [savedPosts, setSavedPosts] = useState<{ [key: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addTags, setAddTags] = useState<string>('');
  const [openCommentsPost, setOpenCommentsPost] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const [postId, setPostId] = useState<string>('');

  const getPosts = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error('No authentication token found, please log in.');

      const [postsData, likeData, articuleData] = await Promise.all([
        GetFetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev-get`, token),
        GetFetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${user.id}/liked-posts`, token),
        GetFetch(`${import.meta.env.VITE_BACKEND_URL}/api/all-articule`, token),
      ]);
      console.log(articuleData);
      const likedPostsState: { [key: string]: boolean } = {};
      const savedPostsState: { [key: string]: boolean } = {};

      likeData.likedPostIds.forEach((id: string) => {
        likedPostsState[id] = true;
      });

      const savePromises = postsData.map((post: Post) =>
        GetFetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${post._id}/${user.id}/save`,
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
      setError((error as Error).message || 'Error fetching posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? techOptions.length - 6 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === techOptions.length - 6 ? 0 : prevIndex + 1));
  };

  const handleTechSelect = (tech: string) => {
    setSelectedTechs((prev) => {
      if (prev.includes(tech)) {
        return prev.filter((t) => t !== tech);
      }
      return [...prev, tech];
    });
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
      if (!token) throw new Error('No authentication token found, please log in.');

      const isSaved = savedPosts[postId] || false;

      setSavedPosts((prevState) => ({
        ...prevState,
        [postId]: !isSaved,
      }));

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? { ...post, savePost: !isSaved } : post))
      );

      await PatchFetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev/${postId}/save`, token, {
        user_id: user.id,
      });
      const postToSave = posts.find((p) => p._id === postId);
      if (!postToSave) return;

      if (isSaved) {
        dispatch(removeSavedPost(postId));
        toast.info('Post eliminado de guardados');
      } else {
        dispatch(savePost(postToSave)); // ✅ guarda todo el objeto
        toast.success('Post guardado correctamente');
      }
    } catch (error) {
      console.error('Error al guardar/desguardar el post:', error);
      toast.error('Error al actualizar el estado del post');
    }
  };

  const handleLikePost = async (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ): Promise<void> => {
    event.stopPropagation();
    try {
      if (!token) throw new Error('No authentication token found, please log in.');

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

      await PatchFetch(`api/post-dev/${postId}/like`, token, {
        user_id: user.id,
      });
    } catch (error) {
      console.error('Error al dar like/unlike al post:', error);
    }
  };
  useEffect(() => {
    if (selectedTechs.length > 0) {
      const filterData = posts.filter((post) =>
        post.tags.some((tag) => selectedTechs.includes(tag))
      );
      setPosts(filterData);
    }
  }, []);
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
  }, [user.id]);

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
    currentIndex,
    selectedTechs,
    handleTechSelect,
    handleNextClick,
    handlePrevClick,
    savedPosts,
    addTags,
    setAddTags,
  };
};
