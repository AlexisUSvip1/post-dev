import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserData } from './Home.types';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { setUser } from '../../features/user/userSlice';

export const Homehook = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const decodeTokenAndSetUserData = () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No se encontró el token de autenticación.');
        }

        // Decode token
        const decodedToken: UserData = jwtDecode(token);

        // Update local state
        setUserData(decodedToken);

        // Dispatch directly with decodedToken
        dispatch(setUser(decodedToken));
      } catch (err) {
        setError((err as Error).message || 'Error al procesar el token.');
        setUserData({});
      } finally {
        setLoading(false);
      }
    };

    decodeTokenAndSetUserData();
  }, [dispatch]);

  return { userData, loading, error };
};
