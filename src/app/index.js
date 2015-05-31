import React, { Component } from 'react';
import FileInput from '../components/file-upload';
import AudioRenderer from '../components/audio-renderer';
import Marty from 'marty';

class App extends Component {
  selectFile = (file) => {
    console.log(this.app);
    this.app.SongActionCreators.loadSong({ file });
  }

  clearFile = () => {
    this.app.SongActionCreators.clearSong();
  }

  renderFileDetails() {
    const file = this.props.state.get('file');
    return <dl>
      <dt>Filename</dt>
      <dd>{file.get('name')}</dd>
      <dt>Size</dt>
      <dd>{file.get('size')}</dd>
      <dt>Type</dt>
      <dd>{file.get('type')}</dd>
    </dl>;
  }
  renderAudio() {
    return (
      <div>
        <button type="button" onClick={this.clearFile.bind(this)}>
          Reset
        </button>
        {this.renderFileDetails()}
        <AudioRenderer width={800} height={100} type="div" />
      </div>
    );
  }

  renderFileInput() {
    return <FileInput onFile={this.selectFile.bind(this)} />;
  }

  renderErrors() {
    const errors = this.props.state.get('errors');
    if(!errors.count()) {
      return null;
    }
    return <ul style={{color: 'red'}}>
      {errors.map((error, type) => {
        return <li key={type}><strong>{type}</strong> {error.message}</li>;
      }).toList()}
    </ul>;
  }

  render() {
    return (
      <div>
        {this.renderErrors()}
        {this.props.state.has('audioData') ?
          this.renderAudio() :
          this.renderFileInput()
        }
      </div>
    );
  }
}

export default Marty.createContainer(App, {
  listenTo: ['SongStore'],
  fetch: {
    state() {
      return this.app.SongStore.getState();
    }
  },
  done(props) {
    return (
      <App {...props} />
    );
  }
});
