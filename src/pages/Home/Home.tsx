import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import useAuthenticated from '../../hooks/useAuthenticate';
import RecentlyPlayed from './components/MusicPanel';
import bcx from '../../utils/bindingClassNames';

import styles from './home.module.css';
import { Trending } from './components/Trending';
import useLoading from '../../hooks/useLoading';
import Spinner from '../../components/LoadingSpinner/LoadingSpinner';
const cls = bcx(styles);

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuthenticated();
  const [isLoading] = useLoading();
  useEffect(() => {
    if(!loading && !currentUser?.authenticated) navigate("/login");
  }, [loading, currentUser]);

  return (
    <>
    {isLoading ? (
      <div className={cls('center-spinner')}><Spinner /></div>
    ) : (
      <div className={cls('home-wrapper')}>
          {/* Recently Played */}
          <RecentlyPlayed subject="Recently Played" />
          {/* Trending */}
          <Box sx={{ marginTop: 1 }}>
            <Trending />
          </Box>
          </div>
        )}
      </>
      );
};

export default Home;
