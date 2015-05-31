import { Store } from 'marty';
import { Map } from 'immutable';
import { SongConstants } from '../constants';

const DEFAULT_STATE = new Map({
  errors: new Map({}),
  samples: new Map({})
});

export default class SongStore extends Store {
  constructor(options) {
    super(options);
    this.state = DEFAULT_STATE;
    this.handlers = {
      _handleLoadSongDone: [SongConstants.LOAD_SONG_DONE],
      _handleLoadSongStarted: [SongConstants.LOAD_SONG_STARTING],
      _handleLoadSongFailed: [SongConstants.LOAD_SONG_FAILED],
      _handleParseAudioDone: [SongConstants.PARSE_AUDIO_DONE],
      _handleParseAudioStarted: [SongConstants.PARSE_AUDIO_STARTING],
      _handleParseAudioFailed: [SongConstants.PARSE_AUDIO_FAILED],
      _handleGetSamplesStarted: [SongConstants.GET_SAMPLES_STARTING],
      _handleGetSamplesDone: [SongConstants.GET_SAMPLES_DONE],
      _handleClear: [SongConstants.CLEAR_SONG]
    };
  }

  getAudio() {
    return this.state.get('audioData');
  }

  getSamples(sampleCount) {
    if(!this.state.has('audioData')) {
      throw new Error('Cannot get samples without audio data');
    }

    return this.fetch({
      id: `getSamples(${sampleCount})`,
      locally() {
        return this.state.getIn(['samples', sampleCount]);
      },
      remotely() {
        return this.app.SongQueries.getSamples(sampleCount, this.state.get('audioData'));
      }
    });
  }

  _handleLoadSongStarted() {
    this._handleClear();
  }
  _handleLoadSongDone(fileBuffer, {name, size, type}) {
    this.state = this.state
      .set('file', new Map({ name, size, type }))
      .set('fileBuffer', fileBuffer);
  }
  _handleLoadSongFailed(error) {
    this._handleError('loadSong', error);
  }
  _handleParseAudioStarted() {
    this._handleErrorClear('parseAudio');
  }
  _handleParseAudioDone(audioBuffer) {
    this.state = this.state.set('audioData', audioBuffer);
  }
  _handleParseAudioFailed(error) {
    console.error(error.stack);
    this._handleError('parseAudio', error);
  }
  _handleGetSamplesStarted(sampleCount) {
    this.state = this.state.deleteIn(['samples', sampleCount]);
  }
  _handleGetSamplesDone(sampleCount, output) {
    this.state = this.state.setIn(['samples', sampleCount], output);
  }

  _handleClear() {
    this.state = DEFAULT_STATE;
  }

  _handleError(type, error) {
    this.state = this.state.setIn(['errors', type], error);
  }
  _handleErrorClear(type) {
    this.state = this.state.deleteIn(['errors', type]);
  }
}
