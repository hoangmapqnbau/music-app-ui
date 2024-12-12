import { ReactNode, useReducer } from 'react';

import MusicContext from './MusicContext';
import { IMusic } from '../../layouts/FooterBar/FooterBar';

export type MusicContextType = {
  currentSong?: string;
  songPlaying: boolean;
  songList: IMusic[];
};

export type Action =
  | { type: 'SET_CURRENT_SONG'; payload: string | undefined }
  | { type: 'SONG_PLAYING'; payload: boolean }
  | { type: 'SET_SONGS_RECENTLY'; payload: Array<IMusic> };

const initMusic: MusicContextType = {
  currentSong: undefined,
  songPlaying: true,
  songList: [],
};

const reducer = (state: MusicContextType, action: Action): MusicContextType => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    case 'SONG_PLAYING':
      return { ...state, songPlaying: action.payload };
    case 'SET_SONGS_RECENTLY':
      return { ...state, songList: action.payload };
    default:
      return state;
  }
};

interface MusicProviderProps {
  children: ReactNode;
}

const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initMusic);

  return <MusicContext.Provider value={{ state, dispatch }}>{children}</MusicContext.Provider>;
};

export default MusicProvider;
