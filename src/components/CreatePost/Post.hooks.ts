/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useAppSelector } from '../../hook/useAppSelector';
import { PostHook } from './Post.types';
import { usePostModal } from '../Layout/Navbar/NavbarTop/NavbarTop.hooks';
import { techOptions } from '../../utils/Tags/Tags';

export const usePostHook = (): PostHook => {
  const [localContent, setLocalContent] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [addTags, setAddTags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [changePost, setChangePost] = useState<string>('POST');
  const [contFiles, setContFiles] = useState(0);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { handleCloseModal, handleSetPostContent } = usePostModal();
  const user = useAppSelector((state) => state.user);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const newPreviews = [...imagePreviews];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string);
          setImagePreviews([...newPreviews]);
          setContFiles(newPreviews.length);
          setFileSelected(true);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteFilePost = (previewImage: string): void => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((img) => img !== previewImage));
    setImageFiles((prevFiles) =>
      prevFiles.filter((file, _index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return reader.result !== previewImage;
      })
    );
    setContFiles((prevCount) => prevCount - 1);
    setFileSelected(imagePreviews.length - 1 > 0);
  };

  const handleSubmit = async (): Promise<void> => {
    setLoadingSubmit(true);
    try {
      if (!user?.id) throw new Error('User ID is undefined');
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found, please log in.');

      const formData = new FormData();
      formData.append('user_id', user.id.toString());
      formData.append('title', localContent);
      formData.append('body', textContent);
      formData.append('type', 'POST');
      addTags.forEach((tag) => formData.append('tags', tag));
      imageFiles.forEach((file) => formData.append('files', file));

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-dev`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create post');
      handleSetPostContent(localContent);
      handleCloseModal();
      setLocalContent('');
      setTextContent('');
      setAddTags([]);
      setImageFiles([]);
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
    }
    setLoadingSubmit(false);
  };

  const changeModalPost = (change: string): void => {
    if (change !== 'POST') {
      setChangePost('ARTICULE');
    } else {
      setChangePost('POST');
    }
  };

  return {
    localContent,
    loadingSubmit,
    setLocalContent,
    textContent,
    setTextContent,
    addTags,
    setAddTags,
    handleSubmit,
    techOptions,
    fileSelected,
    contFiles,
    imagePreviews,
    handleFileChange,
    handleDeleteFilePost,
    changeModalPost,
    changePost,
  };
};
