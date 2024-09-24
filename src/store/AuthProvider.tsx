import { useReducer, Dispatch, createContext } from 'react';

type State = {
  username: string;
  password: string;
  isSubmitting: boolean;
  errorMessage: string;
};

type Action =
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: string };

export type AuthContextType = {
  state: State;
  dispatch: Dispatch<Action>; // Dispatch sẽ nhận Action
};

const AuthContext: any = createContext(undefined);

const initialState: State = {
  username: '',
  password: '',
  isSubmitting: false,
  errorMessage: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, errorMessage: '' };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, errorMessage: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
