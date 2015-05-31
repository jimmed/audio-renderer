import React, { Component } from 'react';
import moment from 'moment';
import Marty from 'marty';

class AudioRenderer extends Component {
  renderMetadata() {
    const { audio } = this.props;
    const duration = moment.duration(audio.duration, 'seconds');
    const minutes = Math.floor(duration.minutes());
    const seconds = Math.round(duration.seconds());
    return (
      <dl>
        <dt>Duration</dt>
        <dd>{minutes ? `${minutes}:` : null}{seconds}</dd>
        <dt>Sample Rate</dt>
        <dd>{audio.sampleRate}Hz</dd>
        <dt>Channels</dt>
        <dd>{audio.numberOfChannels}</dd>
      </dl>
    );
  }

  renderChannelData() {
    const { samples, height } = this.props;
    const [ left, right ] = samples;
    return <div style={{height}}>
      {left.map(([min,max],i) => (
        <div
          key={i}
          style={{
            height: (max + right[i][1]) * (height / 2),
            borderLeft: '1px solid black',
            display: 'inline-block',
            width: 0
          }}
        />
      ))}
    </div>;
  }

  renderWaveform() {
    return null;
  }

  render() {
    return (
      <div>
        {this.renderMetadata()}
        {this.renderChannelData()}
        {this.renderWaveform()}
      </div>
    );
  }
}

export default Marty.createContainer(AudioRenderer, {
  listenTo: 'SongStore',
  fetch: {
    audio() {
      return this.app.SongStore.getAudio();
    },
    samples() {
      return this.app.SongStore.getSamples(this.props.width);
    }
  },
  pending() {
    return <div>Rendering...</div>;
  }
});
