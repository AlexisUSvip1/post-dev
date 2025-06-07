import { useEffect, useState } from 'react';
import { ArticulePreviewObject } from './ArticuleForm.type';
import { PostFetch } from '../../utils/Fetch/fetch.ts';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hook/useAppSelector.ts';

export const useArticule = (): {
  previewObject: any;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  handlePostArticule: () => Promise<void>;
} => {
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [debouncedUrl, setDebouncedUrl] = useState('');
  const token = localStorage.getItem('token');
  const user = useAppSelector((state) => state.user);

  const [previewObject, setPreviewObject] = useState({
    title: '',
    image: '',
    description: '',
    url: '',
  });

  // Función para publicar el artículo
  const handlePostArticule = async (): Promise<void> => {
    try {
      if (!token) {
        toast.error('No se encontró el token de autenticación, por favor inicia sesión.');
        return;
      }

      const articuleData = {
        user_id: user.id, // Asegúrate de que `user.id` tenga un valor válido
        type: 'ARTICULE',
        user_avatar: user.avatar_url, // Verifica que el `avatar_url` esté disponible
        usernameUser: user.displayName, // Asegúrate de que el nombre de usuario esté correctamente definido
        title: previewObject.title, // El título se obtiene de la vista previa (puede estar vacío si no se obtiene correctamente)
        body: body, // El cuerpo del artículo que el usuario escribe
        url: previewObject.url, // La URL que el usuario ingresa
        media: [{ url: previewObject.image, type: 'image' }], // Imagen como un objeto con url y tipo
      };

      await PostFetch(`${import.meta.env.VITE_BACKEND_URL}/api/post-articule`, token, articuleData);
      window.location.reload();
    } catch (error) {
      console.error('Error al publicar el artículo:', error);
      toast.error('Error al publicar el artículo');
    }
  };

  // Manejo del debounce para la URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (url) setDebouncedUrl(url);
    }, 800);
    return () => clearTimeout(timer);
  }, [url]);

  // Obtención de la vista previa del artículo (por URL)
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await fetch(
          `https://api.linkpreview.net?key=015b5e7ca1528b4673bfaa8c570b07d7&q=${debouncedUrl}`
        );
        const data = await response.json();
        setPreviewObject({
          title: data.title,
          image: data.image,
          url: data.url,
          description: data.description,
        });
      } catch (error) {
        console.error('Error fetching preview:', error);
        setPreviewObject({ title: '', image: '', description: '', url: '' });
      }
    };

    if (debouncedUrl) {
      void fetchPreview();
    }
  }, [debouncedUrl]);

  // Devolver todo lo necesario desde el hook
  return { previewObject, setUrl, setBody, handlePostArticule };
};
