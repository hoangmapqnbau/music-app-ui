import { Typography } from '@mui/material';
import bcx from '../../../utils/bindingClassNames';
import styles from '../home.module.css';

const cls = bcx(styles);

export const Trending = () => {
  return (
    <div className={cls('trending')}>
      <Typography variant="h5" sx={{ marginBottom: 3 }} gutterBottom>
        Trending
      </Typography>
      <div className={cls('trending-items')}></div>
    </div>
  );
};
