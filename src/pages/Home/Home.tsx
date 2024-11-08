import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import useAuthenticated from '../../hooks/useAuthenticate';
import RecentlyPlayed from './components/RecentlyPlayed';
import bcx from '../../utils/bindingClassNames';

import styles from './home.module.css';
import { Trending } from './components/Trending';
const cls = bcx(styles);

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuthenticated();

  useEffect(() => {
    // if(!loading && !currentUser?.authenticated) navigate("/login");
  }, [loading, currentUser]);

  return (
    <div className={cls('home-wrapper')}>
      {/* Recently Played */}
      <RecentlyPlayed />
      <RecentlyPlayed />
      <RecentlyPlayed />
      {/* Trending */}
      <Box sx={{marginTop: 1 }}>
        <Trending />
      </Box>
    </div>
  );
};

export default Home;
