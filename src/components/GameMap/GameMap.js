import React, { PropTypes } from 'react';

import * as THREE from 'three';

import React3 from 'react-three-renderer';

import Resources from './Resources';

import RegionsLayer from './RegionsLayer';

import MoveMap from './Hoc/MoveMap';
import ShowStats from './Hoc/ShowStats';
import MouseInput from './Inputs/MouseInput';


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
      cameraPosition: new THREE.Vector3(0, 150, 500),
      cameraRotation: new THREE.Euler(),
      cameraConfig: {
        fov: 50,
        aspect: size.width / size.height,
        near: 1,
        far: 1000,
      },
      mouseInput: null,
    };

    this.regionList = [
      {
        id: 1,
        resourceId: 'california',
        position: {
          x: -300,
          y: -100,
          z: 1,
        },
        color: 0xf08000,
        rotation: new THREE.Euler(0, 0, 0),
      },
      {
        id: 2,
        resourceId: 'california',
        position: {
          x: 0,
          y: -100,
          z: 1,
        },
        color: 0xf080f0,
        rotation: new THREE.Euler(0, 0, 0),
      },
    ];
  }

  componentDidMount() {
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

  _onAnimate = () => {
    this._onAnimateInternal();
  }

  // eslint-disable-next-line class-methods-use-this
  _onAnimateInternal() {}

  _onClickRegion(region) {
    // eslint-disable-next-line no-console
    console.log('show region', this.regionList, region);
  }

  render() {
    // console.log(this.regionList);
    const {
      size,
      groupRotation,
      groupPosition,
      cameraConfig,
      cameraPosition,
      cameraRotation,
      mouseInput,
    } = this.state;

    const onAnimate = this._onAnimate;

    return (<div ref={(c) => { this.refContainer = c; }}>
      <React3
        width={size.width}
        height={size.height}
        antialias
        pixelRatio={typeof (window) === 'undefined' ? 1 : window.devicePixelRatio}
        mainCamera="mainCamera"
        clearColor={0xf0f0f0}
        onAnimate={onAnimate}
      >
        <module
          ref={(c) => { this.mouseInput = c; }}
          descriptor={MouseInput}
        />
        <scene ref={(c) => { this.refScene = c; }}>
          <perspectiveCamera
            name="mainCamera"
            ref={(c) => { this.refCamera = c; }}
            fov={cameraConfig.fov}
            aspect={cameraConfig.aspect}
            near={cameraConfig.near}
            far={cameraConfig.far}

            position={cameraPosition}
            rotation={cameraRotation}
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
            <RegionsLayer
              mouseInput={mouseInput}
              regionList={this.regionList}
              onClickRegion={this._onClickRegion}
            />
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default ShowStats(MoveMap(GameMap));
