import { useContext } from 'react';
import { Tooltip, Typography } from '@mui/material';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

import bcx from '../../utils/bindingClassNames';
import { IMusicCard } from './music-card.interface';

import Styles from './card.module.css';
import { BASE } from '../../constant/api';
import { setCurrentSong } from '../../store/MusicStore/actions';
import useMusicStore from '../../hooks/useMusicStore';

const cls = bcx(Styles);

const baseUrl = (name: string) => `${BASE}/uploads/images/${name}`;

function MusicCard({ _id, image, songName, artist }: IMusicCard) {
  const context = useMusicStore();

  return (
    <Tooltip
      arrow
      enterDelay={500}
      title={
        <Typography className={cls('text-truncate')} color="#e3ebe0">
          {songName}
        </Typography>
      }
    >
      <div className={cls('music-card')} onClick={() => context?.dispatch(setCurrentSong(_id?.toString()))}>
        <img className={cls('image-card')} src={baseUrl(image)} alt={songName} width={150} height={147} />
        <Typography className={cls('text-truncate')} color="#e3ebe0">
          {songName}
        </Typography>
        <Typography className={cls('text-truncate')} color="#78797a">
          {artist}
        </Typography>
        <PlayCircleOutlinedIcon className={cls('play-icon')} />
      </div>
    </Tooltip>
  );
}

export default MusicCard;
