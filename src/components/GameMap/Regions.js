import React from 'react';
import * as THREE from 'three';
import PropTypes from 'react/lib/ReactPropTypes';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
//
// const extrudeSettings = {
//   amount: 8,
//   bevelEnabled: true,
//   bevelSegments: 2,
//   steps: 2,
//   bevelSize: 1,
//   bevelThickness: 1,
// };


/* eslint-disable react/forbid-prop-types */
class Regions extends React.Component {
  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    color: PropTypes.any.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
    rx: PropTypes.number.isRequired,
    ry: PropTypes.number.isRequired,
    rz: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
  };

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    const {
      rx,
      ry,
      rz,
      s,
      resourceId,
      color,
      x,
      y,
      z,
      } = this.props;

    const rotation = new THREE.Euler(rx, ry, rz);
    const scale = new THREE.Vector3(s, s, s);

    return (<group>
      <mesh
        // flat shape
        position={new THREE.Vector3(x, y, z)}
        rotation={rotation}
        scale={scale}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="shape"
        />
        <meshPhongMaterial
          color={color}
          side={THREE.DoubleSide}
        />
      </mesh>
      <line
        // solid line
        position={new THREE.Vector3(x, y, z)}
        rotation={rotation}
        scale={scale}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="points"
        />
        <lineBasicMaterial
          color="black"
          // wireframe
        />
      </line>
    </group>);
  }
}

export default Regions;
