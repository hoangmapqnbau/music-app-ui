import React, { useContext, useEffect } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

import bcx from '../../utils/bindingClassNames';
import Styles from './footer.module.css';
import { Box, Slider } from '@mui/material';
import { VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';
import useMusicStore from '../../hooks/useMusicStore';
import axiosInstance from '../../axios-instance/axiosInstance';
import { HTTP_STATUS_OK } from '../../constant/api';
import { baseUrl } from '../../pages/Home/components/Trending';
import { IMusicCard } from '../../components/MusicCard/music-card.interface';
const cls = bcx(Styles);

function FooterBar() {
  const [position, setPosition] = React.useState(32);
  const [ song, setSong ] = React.useState<IMusicCard>();
  const context = useMusicStore();

  const getMusicById = async () => {
    const url = `/music/${context?.state.currentSong}`;
    const res = await axiosInstance.get(url);
    if(res.status === HTTP_STATUS_OK) {
      const data = await res.data;
      setSong(data)
    }
  }
  
  useEffect(() => {
    getMusicById();
  }, [context?.state.currentSong])

  return (
    <footer>
      <div className={cls('infor-song')}>
        <div className={cls('image-song')}>
          <img className={cls('image')} src={baseUrl(song?.image)} alt={' Tin hsong '} width={60} height={60} />
        </div>
        <div className={cls('infor-music')}>
          <span className={cls('song-name')}>{song?.songName}</span>
          <span className={cls('artist-name')}>{song?.artist}</span>
        </div>
      </div>
      <div className={cls('music-action')}>
        <div className={cls('actions')}>
          <SkipPreviousIcon sx={{ fontSize: 32 }} />
          <PlayCircleOutlinedIcon sx={{ fontSize: 36 }} />
          <SkipNextIcon sx={{ fontSize: 32 }} />
        </div>
        <div className={cls('music-duration')}>
          <Box sx={{ width: 300, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <span className={cls('start-duration')}>0:00</span>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={200}
              onChange={(_, value) => setPosition(value as number)}
              sx={(t) => ({
                color: '#fff',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&::before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                    ...t.applyStyles('dark', {
                      boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                    }),
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
                ...t.applyStyles('dark', {
                  color: '#fff',
                }),
              })}
            />{' '}
            <span className={cls('end-duration')}>4:00</span>
          </Box>
        </div>
      </div>

      <div className={cls('music-control')}>
          <VolumeDownRounded sx={{ color: '#fff' }} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={(t) => ({
              color: '#fff',
              width: '160px',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              ...t.applyStyles('dark', {
                color: '#fff',
              }),
            })}
          />
          <VolumeUpRounded sx={{ color: '#fff' }} />
      </div>
    </footer>
  );
}

export default FooterBar;
