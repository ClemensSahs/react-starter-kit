import React, { PropTypes } from 'react';

import * as THREE from 'three';

import React3 from 'react-three-renderer';

import Stats from 'stats-js';

import Resources from './Resources';

import RegionsLayer from './RegionsLayer';


/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-did-mount-set-state */


// https://de.wikipedia.org/wiki/NUTS#Hierarchieebenen

/**

NUTS 0 (Nationalstaaten)[2]
NUTS 1 “major socio-economic regions (grouping basic regions)” …
        größere Regionen/Landesteile
NUTS 2 “basic regions (for the application of regional policies)” …
        mittelgroße Regionen, Millionenstädte
NUTS 3 “small regions (for specific diagnoses)” …
        kleinere Regionen, teils schon Großstädte


Ebene  Obergrenze  Untergrenze
NUTS 1  7.000.000  3.000.000
NUTS 2  3.000.000  800.000
NUTS 3  800.000  150.000

*/


function mathGetAbsWithNegativ(oldValue, newValue) {
  return (Math.abs(oldValue - newValue) * (oldValue > newValue ? -1 : 1));
}


class GameMap extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 150, 500);

    this.targetRotationOnMouseDown = 0;

    this.mouseX = 0;
    this.mouseOnMouseDown = {
      x: 0,
      y: 0,
    };

    this.targetRotation = 0;
    this.groupPositionDiff = {
      x: 0,
      y: 0,
    };

    const size = {
      width: 500,
      height: 300,
    };

    this.state = {
      ...this.state,
      size: {
        width: size.width,
        height: size.height,
      },
      groupRotation: new THREE.Euler(0, 0, 0),
      groupPosition: new THREE.Vector3(0, 0, 0),
      cameraPosition: {
        fov: 50,
        aspect: size.width / size.height,
        near: 1,
        far: 1000,
      },
    };
  }

  componentDidMount() {
    this.stats = new Stats();

    const container = this.refContainer;

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    container.appendChild(this.stats.domElement);

    container.addEventListener('mousedown', this._onDocumentMouseDown, false);
    container.addEventListener('touchstart', this._onDocumentTouchStart, false);
    document.addEventListener('touchmove', this._onDocumentTouchMove, false);

    const width = this.refContainer.offsetWidth;
    if (width !== 0) {
      const height = ((width / 16) * 9);

      this.setState({
        size: {
          width,
          height,
        },
      });
    }
  }

  componentWillUnmount() {
    const container = this.refContainer;

    container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
    document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);

    delete this.stats;
  }

  _onDocumentMouseDown = (event) => {
    event.preventDefault();

    document.addEventListener('mousemove', this._onDocumentMouseMove, false);
    document.addEventListener('mouseup', this._onDocumentMouseUp, false);
    document.addEventListener('mouseout', this._onDocumentMouseOut, false);

    const windowHalfX = this.state.size.width / 2;
    const windowHalfY = this.state.size.height / 2;

    this.mouseOnMouseDown = {
      x: event.clientX - windowHalfX,
      y: event.clientY - windowHalfY,
    };
    this.groupPositionOnMouseDown = {
      x: this.state.groupPosition.x,
      y: this.state.groupPosition.y,
    };

    // this.targetRotationOnMouseDown = this.targetRotation;
  };

  _onDocumentMouseMove = (event) => {
    const windowHalfX = this.state.size.width / 2;
    const windowHalfY = this.state.size.height / 2;

    this.mouseX = event.clientX - windowHalfX;
    this.mouseY = event.clientY - windowHalfY;

    this.groupPositionDiff.x = mathGetAbsWithNegativ(this.mouseOnMouseDown.x, this.mouseX);
    this.groupPositionDiff.y = mathGetAbsWithNegativ(this.mouseOnMouseDown.y, this.mouseY) * -1;

    // this.targetRotation = this.targetRotationOnMouseDown +
      // (this.mouseX - this.mouseOnMouseDown.x) * 0.02;
  };

  _onDocumentMouseUp = () => {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
  };

  _onDocumentMouseOut = () => {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
  };

  _onDocumentTouchStart = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();

      const windowHalfX = this.state.size.width / 2;

      this.mouseOnMouseDown.x = event.touches[0].pageX - windowHalfX;
      this.targetRotationOnMouseDown = this.targetRotation;
    }
  };

  _onDocumentTouchMove = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();

      const windowHalfX = this.state.size.width / 2;

      this.mouseX = event.touches[0].pageX - windowHalfX;
      this.targetRotation = this.targetRotationOnMouseDown +
        ((this.mouseX - this.mouseOnMouseDown.x) * 0.05);
    }
  };

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  _onAnimateInternal() {
    if (
      Math.abs(this.groupPositionDiff.x) > 0.000001 ||
      Math.abs(this.groupPositionDiff.y) > 0.000001
    ) {
      this.setState({
        groupPosition: new THREE.Vector3(
           this.groupPositionOnMouseDown.x + this.groupPositionDiff.x,
           this.groupPositionOnMouseDown.y + this.groupPositionDiff.y,
           0,
         ),
      });

      this.groupPositionDiff = {
        x: 0,
        y: 0,
      };
    }

    this.stats.update();
  }

  render() {
    const {
      size,
      groupRotation,
      groupPosition,
    } = this.state;

    return (<div ref={(c) => { this.refContainer = c; }}>
      <div
        style={{
          color: 'black',
          position: 'absolute',
          top: '10px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Simple procedurally generated 3D shapes<br />
        Drag to spin
      </div>
      <React3
        width={size.width}
        height={size.height}
        antialias
        pixelRatio={typeof (window) === 'undefined' ? 1 : window.devicePixelRatio}
        mainCamera="mainCamera"
        clearColor={0xf0f0f0}
        onAnimate={this._onAnimate}
      >
        <scene ref={(c) => { this.refScene = c; }}>
          <perspectiveCamera
            name="mainCamera"
            ref={(c) => { this.refCamera = c; }}
            fov={this.state.cameraPosition.fov}
            aspect={this.state.cameraPosition.aspect}
            near={this.state.cameraPosition.near}
            far={this.state.cameraPosition.far}

            position={this.cameraPosition}
          >
            <pointLight
              color={0xffffff}
              intensity={0.8}
            />
          </perspectiveCamera>
          <Resources />
          <group
            position={groupPosition}
            rotation={groupRotation}
          >
            <RegionsLayer />
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default GameMap;
