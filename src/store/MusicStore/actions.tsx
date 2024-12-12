import { IMusic } from '../../layouts/FooterBar/FooterBar';
import { Action } from './MusicProvider';

const setCurrentSong = (payload: string | undefined): Action => ({
  payload,
  type: 'SET_CURRENT_SONG',
});

const setSongPlaying = (payload: boolean): Action =>( {
  type: 'SONG_PLAYING',
  payload
});

const setSongsRecently = (payload: IMusic[]): Action => ({
  type: "SET_SONGS_RECENTLY",
  payload
})

export { setCurrentSong, setSongPlaying, setSongsRecently };
