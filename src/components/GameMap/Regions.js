/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import * as THREE from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import Clickable from './Hoc/Clickable';
// import MouseInput from './Inputs/MouseInput';
//
// const extrudeSettings = {
//   amount: 8,
//   bevelEnabled: true,
//   bevelSegments: 2,
//   steps: 2,
//   bevelSize: 1,
//   bevelThickness: 1,
// };


class Regions extends React.PureComponent {
  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    color: PropTypes.any.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    scale: PropTypes.instanceOf(THREE.Vector3).isRequired,
    rotation: PropTypes.instanceOf(THREE.Euler).isRequired,
    // mouseInput: PropTypes.instanceOf(MouseInput).isRequired,
    onCreate: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _ref = (mesh) => {
    const {
      onCreate,
    } = this.props;

    onCreate(mesh);
  };

  // _onMouseLeave = () => {
  //   const { onMouseLeave } = this.props;
  //
  //   onMouseLeave();
  // };
  //
  _onMouseEnter = () => {
    console.log('mouse hover', this.props.resourceId);
    // const { onMouseEnter } = this.props;
    //
    // onMouseEnter();
  };
  //
  // _onMouseDown = () => {
  //   const { onMouseDown } = this.props;
  //
  //   onMouseDown();
  // };

  _onClick = () => {
    const { onClick } = this.props;

    onClick(this);
  };

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
        ref={this._ref}

        onMouseEnter={this._onMouseEnter}
        // onMouseDown={this._onMouseDown}
        // onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
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
