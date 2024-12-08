import { createContext } from 'react';
import { Action, MusicContextType } from './MusicProvider';

export interface IMusicContext {
  state: MusicContextType;
  dispatch: (action: Action) => void;
}

const MusicContext = createContext<IMusicContext | null>(null);

export default MusicContext;
