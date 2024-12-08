import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import bcx from '../../../utils/bindingClassNames';
import styles from '../home.module.css';

import axiosInstance from '../../../axios-instance/axiosInstance';
import { BASE, HTTP_STATUS_OK } from '../../../constant/api';

const cls = bcx(styles);

export const baseUrl = (name?: string) => `${BASE}/uploads/images/${name}`

export const Trending = () => {
  const [ songs, setSongs ] = useState([]);

  const getMusicForYou = async () => {
    const response = await axiosInstance.get('music');
    
    if(response.status == HTTP_STATUS_OK) {
      const data = await response.data;
      setSongs(data);
    }
  }

  useEffect(() => {
    getMusicForYou();
  }, []);

  return (
    <div className={cls('trending')}>
      <Typography variant="h5" sx={{ paddingBottom: 3 }} gutterBottom>
        Music for you
      </Typography>
      <Box className={cls('trending-items')}>
        {songs?.length && songs.map(({ _id, image, songName, artist }) => (
          <div key={_id} className={cls('list-item')}>
            <div className={cls('image-song')}>
              <div className={cls('overlay')}>
                <PlayArrowIcon className={cls('play-icon')} sx={{ fontSize: 32 }} />
              </div>
              <img className={cls('image')} src={baseUrl(image)} alt={songName} width={60} height={60} />
            </div>
            <div className={cls('infor-music')}>
              <span className={cls('song-name')}>{songName}</span>
              <span className={cls('artist-name')}>{artist}</span>
            </div>
            <div className={cls('play-duration')}>
              <div className={cls('song-duration')}>3:50</div>
              <PlayCircleOutlinedIcon className={cls('play-icon')} />
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
};
