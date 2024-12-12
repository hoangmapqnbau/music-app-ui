import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Slider } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';

import bcx from '../../utils/bindingClassNames';
import Styles from './footer.module.css';
import useMusicStore from '../../hooks/useMusicStore';
import axiosInstance from '../../axios-instance/axiosInstance';
import { BASE, HTTP_STATUS_OK } from '../../constant/api';
import { setCurrentSong } from '../../store/MusicStore/actions';

const cls = bcx(Styles);

export interface IMusic {
  _id: string;
  artist: string;
  fileName: string;
  gerne: string;
  image: string;
  songName: string;
  uploadedAt: string;
  __v: number;
}

function FooterBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [position, setPosition] = React.useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [song, setSong] = React.useState<IMusic>();
  const [songDuration, setSongDuration] = useState<string | undefined>();
  const [songVolume, setSongVolume] = useState(10);
  const context = useMusicStore();

  const getMusicById = async () => {
    const url = `/music/${context?.state.currentSong}`;
    const res = await axiosInstance.get(url);
    if (res.status === HTTP_STATUS_OK) {
      const data = await res.data;
      setSong(data);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const newPosition = value as number;
    if (audioRef.current) {
      audioRef.current.currentTime = newPosition;
    }
    setPosition(newPosition);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPosition(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const volumeValue = Array.isArray(value) ? value[0] : value;
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volumeValue / 10;
      localStorage.setItem('audioVolume', audio.volume.toString());
    }
    setSongVolume(volumeValue);
  };

  const changeSong = (direction: 'next' | 'previous') => {
    const songList = context?.state.songList;
    const currentSongId = context?.state.currentSong;

    if (songList?.length) {
      const currentIndex = songList.findIndex((song) => song._id === currentSongId);
      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % songList.length
          : (currentIndex - 1 + songList.length) % songList.length;

      const nextSongId = songList[nextIndex]._id;
      context?.dispatch(setCurrentSong(nextSongId));
    }
  };

  const handleNextSong = () => changeSong('next');
  const handlePreviousSong = () => changeSong('previous');

  useEffect(() => {
    const audio = audioRef.current;
    const onCanPlayThrough = () => {
      if (audio) {
        const audioVolume = Number(localStorage.getItem('audioVolume')) || 0.5;
        const clampedVolume = Math.max(0, Math.min(1, audioVolume));
        audio.volume = clampedVolume;
        setSongVolume(clampedVolume * 10);
        setSongDuration(`${Math.floor(audio.duration / 60)}:${('0' + Math.floor(audio.duration % 60)).slice(-2)}`);
      }
    };

    const onEnd = () => handleNextSong();

    if (audio) {
      audio.addEventListener('canplaythrough', onCanPlayThrough);
      audio.addEventListener('ended', onEnd);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', onCanPlayThrough);
        audio.removeEventListener('ended', onEnd);
      }
    };
  }, [song]);

  useEffect(() => {
    if (song) {
      const audio = audioRef.current;
      audio?.play();
      setIsPlaying(true);
    }
  }, [context?.state.songPlaying]);

  useEffect(() => {
    const handleKeyDown: any = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  useEffect(() => {
    getMusicById()
      .then(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.load();
          setIsPlaying(false);
        }
      })
      .then(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      });
  }, [context?.state.currentSong]);

  return (
    <footer>
      {song ? (
        <>
          <div className={cls('infor-song')}>
            <div className={cls('image-song')}>
              <img
                className={cls('image')}
                src={song ? `${BASE}/uploads/images/${song?.image}` : ''}
                alt={' Tin hsong '}
                width={60}
                height={60}
              />
            </div>
            <div className={cls('infor-music')}>
              <span className={cls('song-name')}>{song?.songName}</span>
              <span className={cls('artist-name')}>{song?.artist}</span>
            </div>
          </div>
          <div className={cls('music-action')}>
            <div className={cls('actions')}>
              <SkipPreviousIcon sx={{ fontSize: 32 }} onClick={handlePreviousSong} />
              {!isPlaying ? (
                <PlayCircleOutlinedIcon onClick={togglePlayPause} sx={{ fontSize: 36 }} />
              ) : (
                <PauseCircleOutlineIcon onClick={togglePlayPause} sx={{ fontSize: 36 }} />
              )}
              <SkipNextIcon sx={{ fontSize: 32 }} onClick={handleNextSong} />
            </div>
            <audio ref={audioRef} controls={false} hidden onTimeUpdate={handleTimeUpdate}>
              <source src={`${BASE}/uploads/musics/${song?.fileName}`} type="audio/mpeg" />
            </audio>
            <div className={cls('music-duration')}>
              <Box sx={{ width: 300, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <span className={cls('start-duration')}>
                  {Math.floor(position / 60)}:{('0' + Math.floor(position % 60)).slice(-2)}
                </span>
                <Slider
                  aria-label="time-indicator"
                  size="small"
                  value={position}
                  min={0}
                  step={1}
                  max={audioRef.current?.duration || 100}
                  onChange={handleSliderChange}
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
                <span className={cls('end-duration')}>{songDuration ?? '0:00'}</span>
              </Box>
            </div>
          </div>

          <div className={cls('music-control')}>
            <VolumeDownRounded
              onClick={() => {
                setSongVolume(0);
                const audio = audioRef.current;
                if (audio) {
                  audio.volume = 0;
                }
              }}
              sx={{ color: '#fff', fontSize: 20, cursor: 'pointer' }}
            />
            <Slider
              aria-label="Volume"
              value={songVolume}
              onChange={handleVolumeChange}
              min={0}
              max={10}
              sx={(t) => ({
                color: '#fff',
                width: '130px',
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
            <VolumeUpRounded
              onClick={() => {
                setSongVolume(10);
                const audio = audioRef.current;
                if (audio) {
                  audio.volume = 1;
                }
              }}
              sx={{ color: '#fff', fontSize: 20, cursor: 'pointer' }}
            />
          </div>
        </>
      ) : null}
    </footer>
  );
}

export default FooterBar;
