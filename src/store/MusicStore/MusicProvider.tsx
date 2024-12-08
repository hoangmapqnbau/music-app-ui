import { ReactNode, useReducer } from 'react';

import MusicContext from './MusicContext';

 export type MusicContextType = {
  currentSong?: string;
};

export type Action = { type: 'SET_CURRENT_SONG'; payload: string | undefined };

const initMusic: MusicContextType = {
  currentSong: undefined,
};

const reducer = (state: MusicContextType, action: Action): MusicContextType => {
  
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    default:
      return state;
  }
};

interface MusicProviderProps {
  children: ReactNode;
}

const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [ state, dispatch] = useReducer(reducer, initMusic);

  return <MusicContext.Provider value={{ state, dispatch }}>{children}</MusicContext.Provider>;
};

export default MusicProvider;
