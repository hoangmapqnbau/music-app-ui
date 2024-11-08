import { useEffect, useState } from 'react';
import useUserContext from './useUserContext';
import { IUser } from '../pages/Login/model/user.nodel';
import { Action } from '../store/UserStore/UserProvider';
import { getCookie } from '../utils/cookie';
import axiosInstance from '../axios-instance/axiosInstance';
import { logout, userLoggedIn } from '../store/UserStore/UserAction';

const useAuthenticated = () => {
  const { currentUser, dispatch }: { currentUser?: IUser; dispatch?: React.Dispatch<Action> } = useUserContext();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = getCookie('authentication');

      if (!token) {
        dispatch(logout());
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(`users/me`);
      const data = await response.data;

      dispatch(userLoggedIn({ ...data, authenticated: true }));
    } catch (error) {
      console.log('Error', error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { currentUser, loading };
};

export default useAuthenticated;
