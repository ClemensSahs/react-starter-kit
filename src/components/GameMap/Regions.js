import React, { PropTypes } from 'react';
import * as THREE from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import Clickable from './Hoc/Clickable';
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
class Regions extends React.PureComponent {
  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    color: PropTypes.any.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    scale: PropTypes.instanceOf(THREE.Vector3).isRequired,
    rotation: PropTypes.instanceOf(THREE.Euler).isRequired,
  };

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    const {
      position,
      rotation,
      scale,
      resourceId,
      color,
    } = this.props;

    return (<group>
      <mesh
        position={position}
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
        position={position}
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

export default Clickable(Regions);
