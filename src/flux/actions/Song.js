import { ActionCreators } from 'marty';
import { SongConstants as Constants } from '../constants';

export default class SongActionCreators extends ActionCreators {
  loadSong({ file }) {
    this.dispatch(Constants.LOAD_SONG_STARTING, file);

    const reader = new FileReader();
    reader.onload = (event) => {
      this.dispatch(Constants.LOAD_SONG_DONE, event.target.result, file);
      this.parseAudio({ fileBuffer: event.target.result, file });
    };
    reader.onerror = (error) =>
      this.dispatch(Constants.LOAD_SONG_FAILED, error);

    reader.readAsArrayBuffer(file);
  }

  parseAudio({ fileBuffer, file }) {
    this.dispatch(Constants.PARSE_AUDIO_STARTING, fileBuffer, file);

    try {
      const audioContext = new window.AudioContext();
      audioContext.decodeAudioData(
        fileBuffer,
        (audioBuffer) =>
          this.dispatch(Constants.PARSE_AUDIO_DONE, audioBuffer),
        (error) =>
          this.dispatch(Constants.PARSE_AUDIO_FAILED, error)
      );
    } catch(error) {
      this.dispatch(Constants.PARSE_AUDIO_FAILED, error);
    }
  }

  clearSong() {
    this.dispatch(Constants.CLEAR_SONG);
  }
}
