import { Fragment } from 'react/jsx-runtime';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MusicVideoOutlinedIcon from '@mui/icons-material/MusicVideoOutlined';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';

const mainItems = [
  { id: 1, icon: ChairOutlinedIcon, label: 'Home', link: "/" },
  { id: 2, icon: CategoryOutlinedIcon, label: 'Genres', link: '/genres' },
  { id: 3, icon: PersonOutlineOutlinedIcon, label: 'Artists', link: '/artists' },
  { id: 4, icon: LibraryMusicOutlinedIcon, label: 'Albums', link: '/albums' },
  { id: 5, icon: Fragment, label: '', link: "none", separate: true },
  { id: 6, icon: FavoriteBorderOutlinedIcon, label: 'Favourites', link: "/favourites" },
  { id: 7, icon: MusicVideoOutlinedIcon, label: 'Recently Plays', link: '/recently' },
  { id: 8, icon: Fragment, label: '', link: "none", separate: true },
  { id: 9, icon: Fragment, label: '', link: "", title: 'Playlists' },
  { id: 10, icon: PlaylistPlayOutlinedIcon, label: 'Rock & Roll', link: '/t' },
  { id: 11, icon: PlaylistPlayOutlinedIcon, label: 'Best of 90s', link: '/t' },
  { id: 12, icon: PlaylistPlayOutlinedIcon, label: 'Work Time', link: '/t' },
  { id: 13, icon: PlaylistPlayOutlinedIcon, label: 'Exercise mode', link: '/t' },
];

export { mainItems };
