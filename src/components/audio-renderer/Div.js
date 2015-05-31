import React, { Component, PropTypes } from 'react';

export default class DivGraph extends Component {
  render() {
    const { samples, height } = this.props;
    const [ left, right ] = samples;
    return <div style={{height}}>
      {left.map((max,i) => (
        <div
          key={i}
          style={{
            height: (max + right[i]) * (height / 2),
            borderLeft: '1px solid black',
            display: 'inline-block',
            width: 0
          }}
        />
      ))}
    </div>;
  }
}
