import { useContext } from 'react';
import { IUser } from '../pages/Login/model/user.nodel';
import UserContext from '../store/UserStore/UserContext';
import { Action } from '../store/UserStore/UserProvider';

const useUserContext = () => {
  const { currentUser, dispatch }: { currentUser: IUser; dispatch: React.Dispatch<Action> } = useContext(UserContext);
  return { currentUser, dispatch };
};

export default useUserContext;
