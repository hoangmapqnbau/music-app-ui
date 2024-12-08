import { useContext } from 'react';
import MusicContext, { IMusicContext } from '../store/MusicStore/MusicContext';

const useMusicStore = () => {
  const context = useContext<IMusicContext | null>(MusicContext);
  return context;
};

export default useMusicStore;
