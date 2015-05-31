import React, { Component, PropTypes } from 'react';

class DropZone extends Component {
  render() {
    return null;
  }
}

class FileSelector extends Component {
  onSelect = ({ currentTarget: { files }}) => {
    if (!files || !files.length) {
      return;
    }

    this.props.onSelect(files[0]);
  }

  open() {
    React.findDOMNode(this.refs.file).click();
  }

  render() {
    return (
      <input
        type="file"
        ref="file"
        style={{display: 'none'}}
        onChange={this.onSelect}
        />
    );
  }
}

export default class FileUpload extends Component {
  openSelector = () => {
    this.refs.selector.open();
  }

  onFile = (file) => {
    this.props.onFile(file);
  }

  render() {
    return (
      <div style={this.props.style}>
        <FileSelector ref="selector" onSelect={this.onFile} />
        <DropZone onDrop={this.onFile} />
        <button kind="button" onClick={this.openSelector}>
          Select file
        </button>
      </div>
    );
  }
}
