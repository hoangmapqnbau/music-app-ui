import { useReducer } from 'react';

import UserContext from './UserContext';
import INIT_USER_MODEL, { IUser } from '../../pages/Login/model/user.nodel';

import { CLEAR_USER_FIELDS, LOG_OUT, USER_INFORMATION_INPUT, USER_SIGN_IN } from './UserConstant';

const initialState = INIT_USER_MODEL;

export type Action = {
  type: string;
  payload?: IUser;
};

const reducer = (state: IUser, action: Action) => {
  switch (action.type) {
    case USER_INFORMATION_INPUT:
      return { ...state, ...action.payload };
    case CLEAR_USER_FIELDS:
      return initialState;
    case USER_SIGN_IN: 
      return {...state, ...action.payload };
    case LOG_OUT: 
      return initialState;
    default:
      return state;
  }
};

const UserProvider = ({ children }: any) => {
  const [currentUser, dispatch] = useReducer(reducer, initialState);
  
  return <UserContext.Provider value={{ currentUser, dispatch }}>{children}</UserContext.Provider>;
};

export default UserProvider;
