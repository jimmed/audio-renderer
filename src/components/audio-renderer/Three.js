import React, { Component, PropTypes } from 'react';
import {Scene, PerspectiveCamera, Object3D, Mesh, PointLight} from 'react-three';
import three from 'three';

const start = -450;
function barGeometry(energy) {
  return new three.BoxGeometry(1, energy * 200, energy * 20);
}
function barPosition(index) {
  return new three.Vector3(start + index, 0, 0);
}

export default class ThreeGraph extends Component {
  render() {
    const { samples, width, height } = this.props;
    const [ left, right ] = samples;

    const material = new three.MeshLambertMaterial({ color: 0xFF0000 });

    return <div>
      <Scene {...{width, height}} background={0xFFFFFF} camera="mainCamera">
        <PerspectiveCamera
          name="mainCamera"
          fov={75}
          aspect={ width / height }
          near={1}
          far={5000}
          position={new three.Vector3(0, 200, 600)}
          lookat={new three.Vector3(0, 0, 0)} />
        <Object3D>
          <PointLight
            hex={0xFFFF00}
            position={new three.Vector3(200, 200, 200)}
            intensity={100}
          />
          {left.map((energy, index) => {
            return <Mesh
              key={index}
              material={material}
              geometry={barGeometry(energy)}
              position={barPosition(index)} />;
          })}
        </Object3D>
      </Scene>
    </div>;
  }
}
