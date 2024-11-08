import { Typography } from '@mui/material';
import bcx from '../../../utils/bindingClassNames';
import styles from '../home.module.css';
import MusicCard from '../../../components/MusicCard/MusicCard';
const cls = bcx(styles);
const musicItems = [
  { id: 1, image: 'src/assets/png/cahoihoang.webp', songname: 'Tầng thượng 102', artists: 'Cá Hồi Hoang' },
  { id: 2, image: 'src/assets/png/haanhtuan.webp', songname: 'Tháng 4 là lời nói dối của em', artists: 'Hà Anh Tuấn' },
  { id: 3, image: 'src/assets/png/imagedragon.png', songname: 'Demons', artists: 'Image Dragons' },
  { id: 4, image: 'src/assets/png/Rapper_DSK.png', songname: 'Lớn rồi', artists: 'DSK' },
  { id: 5, image: 'src/assets/png/quaivattihon.jpg', songname: 'Đường về', artists: 'Quá Vật Tí Hon' },
  { id: 6, image: 'src/assets/png/cahoihoang.webp', songname: '2004', artists: 'Cá Hồi Hoang' },
  { id: 7, image: 'src/assets/png/coldplay.pg.jpg', songname: 'Viva la vida', artists: 'Coldplay' },
  { id: 8, image: 'src/assets/png/thecatssetle.jpg', songname: 'Rừng đom đóm', artists: 'The Cassette' },
  { id: 9, image: 'src/assets/png/vu.jpg', songname: 'Lạ lùng', artists: 'Vũ.' },
];

const RecentlyPlayed = () => {
  return (
    <div className={cls('recently-played')}>
      <Typography variant="h5" sx={{ marginBottom: 1 }} gutterBottom>
        Recently plays
      </Typography>
      <div className={cls('played-items')}>
        {musicItems.map((song) => {
          return (
            <>
              <MusicCard {...song} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
