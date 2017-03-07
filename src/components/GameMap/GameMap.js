import React, { PropTypes } from 'react';

import * as THREE from 'three';

import React3 from 'react-three-renderer';

import Stats from 'stats-js';

import Resources from './Resources';

import RegionsLayer from './RegionsLayer';

import MoveMap from './Hoc/MoveMap';


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

class GameMap extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 150, 500);

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
    delete this.stats;
  }

  _onAnimate = () => {
    this._onAnimateInternal();
  }

  _onAnimateInternal() {
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

export default MoveMap(GameMap);
