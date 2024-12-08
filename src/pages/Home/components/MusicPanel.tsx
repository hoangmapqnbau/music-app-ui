import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import bcx from '../../../utils/bindingClassNames';
import styles from '../home.module.css';
import MusicCard from '../../../components/MusicCard/MusicCard';
import { HTTP_STATUS_OK } from '../../../constant/api';
import axiosInstance from '../../../axios-instance/axiosInstance';
import { IMusicCard } from '../../../components/MusicCard/music-card.interface';
import { setCurrentSong } from '../../../store/MusicStore/actions';
import useMusicStore from '../../../hooks/useMusicStore';

const cls = bcx(styles);

const MusicPanel = ({ subject }: { subject: string }) => {
  const [recently, setRecently] = useState([]);
  const context = useMusicStore();

  const getRecentlySongs = async () => {
    const response = await axiosInstance.get('music/recent');

    if (response.status == HTTP_STATUS_OK) {
      const data = await response.data;
      setRecently(data);
      context?.dispatch(setCurrentSong(data[0]._id?.toString()));
    }
  };

  useEffect(() => {
    getRecentlySongs();
  }, []);

  return (
    <div className={cls('recently-played')}>
      <Typography variant="h5" sx={{ marginBottom: 1 }} gutterBottom>
        {subject}
      </Typography>
      <div className={cls('played-items')}>
        {recently?.length && recently.map((song: IMusicCard) => <MusicCard key={song._id} {...song} />)}
      </div>
    </div>
  );
};

export default MusicPanel;
