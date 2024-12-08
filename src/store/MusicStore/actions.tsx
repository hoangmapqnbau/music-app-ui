import { Action } from "./MusicProvider";

const setCurrentSong= (payload: string |undefined): Action => ({
  payload,
  type: 'SET_CURRENT_SONG',
});

export { setCurrentSong };
