import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import UserProvider from './store/UserStore/UserProvider.tsx';
import MusicProvider from './store/MusicStore/MusicProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <UserProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </UserProvider>
  </BrowserRouter>,
);
