import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Marty from 'marty';
import DivGraph from './Div';
import ThreeGraph from './Three';

class AudioRenderer extends Component {
  renderMetadata() {
    // TODO: Move to own component
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

  renderWaveform() {
    const { samples, height, width, type } = this.props;
    switch(type) {
      case 'div': return <DivGraph {...{samples, height, width}} />;
      case '3d': return <ThreeGraph {...{samples, height, width}} />;
    }
    throw new Error(`Unknown type ${type}`);
  }

  render() {
    return (
      <div>
        {this.renderMetadata()}
        {this.renderWaveform()}
      </div>
    );
  }
}


AudioRenderer.propTypes = {
  type: PropTypes.oneOf(['div','3d']),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};
AudioRenderer.defaultProps = {
  type: '3d'
};

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
