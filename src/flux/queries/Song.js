import { Queries } from 'marty';
import { SongConstants as Constants } from '../constants';
import chunk from 'lodash/array/chunk';
import Promise from 'bluebird';

export default class SongQueries extends Queries {
  getSamples(sampleCount, audio) {
    this.dispatch(Constants.GET_SAMPLES_STARTING, sampleCount);

    return new Promise(resolve => setTimeout(resolve, 1))
      .then(() => {
        const channels = [];
        for(let i = 0; i < audio.numberOfChannels; i++) {
          channels.push(audio.getChannelData(i));
        }
        return channels;
      })
      .map(channel => chunk(channel, Math.floor(audio.length / sampleCount)))
      .map(chunks => chunks.map(samples => Math.max.apply(Math, samples)))
      .then(output => this.dispatch(Constants.GET_SAMPLES_DONE, sampleCount, output))
      .catch(error => this.dispatch(Constants.GET_SAMPLES_FAILED, sampleCount));
  }
}
