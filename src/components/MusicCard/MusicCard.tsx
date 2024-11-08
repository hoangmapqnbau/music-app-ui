import { Tooltip, Typography } from '@mui/material';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

import bcx from '../../utils/bindingClassNames';
import { IMusicCard } from './music-card.interface';

import Styles from './card.module.css';
const cls = bcx(Styles);

function MusicCard({ image, songname, artists }: IMusicCard) {
  return (
    <Tooltip
      arrow
      enterDelay={500}
      title={
        <Typography className={cls('text-truncate')} color="#e3ebe0">
          {songname}
        </Typography>
      }
    >
      <div className={cls('music-card')}>
        <img className={cls('image-card')} src={image} alt={songname} width={190} height={187} />
        <Typography className={cls('text-truncate')} color="#e3ebe0">
          {songname}
        </Typography>
        <Typography className={cls('text-truncate')} color="#78797a">
          {artists}
        </Typography>
        <PlayCircleOutlinedIcon className={cls('play-icon')}/>
      </div>
    </Tooltip>
  );
}

export default MusicCard;
