import { useEffect, useState } from 'react';
import { GetFetch, PostFetch } from '../../Utils/Fetch/fetch';
import { FollowetsType, UserRequest } from './Followers.type';
import { useAppSelector } from '../../hook/useAppSelector';

export const useFollowers = (): FollowetsType => {
  const [users, setUsers] = useState<UserRequest[]>([]);
  const token = localStorage.getItem('token');
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await GetFetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/newFollowers/${user.id}`,
          token
        );
        setUsers(response);
      } catch (error) {
        console.error("Error al obtener seguidores:", error);
      }
    };
    fetchFollowers();
    console.log(users);
  }, [user.id]);

  const sendFriendRequest = async (friendId: string) => {
    const token = localStorage.getItem("token");

    if (!token || !user.id) {
      console.error("Missing user or token");
      return;
    }

    try {
      const response = await PostFetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sendRequestFriend/${
          user.id
        }/${friendId}`,
        token,
        { sendRequest: "pending" }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Solicitud de amistad enviada:", data);
      } else {
        const errorData = await response.json();
        console.error("Error al enviar la solicitud:", errorData);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return { users, sendFriendRequest };
};
