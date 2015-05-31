import { Queries } from 'marty';
import { SongConstants as Constants } from '../constants';
import chunk from 'lodash/array/chunk';
//import math from 'mathjs';

export default class SongQueries extends Queries {
  getSamples(sampleCount, audio) {
    this.dispatch(Constants.GET_SAMPLES_STARTING, sampleCount);

    const step = Math.floor(audio.length / sampleCount);
    const channels = [];
    for(let i = 0; i < audio.numberOfChannels; i++) {
      channels.push(audio.getChannelData(i));
    }
    const output = channels
      .map(channel => chunk(channel, step))
      .map(chunks => {
        return chunks.map(samples => [
          Math.min.apply(Math, samples),
          Math.max.apply(Math, samples),
          //math.median(samples)
        ]);
      });

    return Promise.resolve()
      .then(() => this.dispatch(Constants.GET_SAMPLES_DONE, sampleCount, output));
  }
}
