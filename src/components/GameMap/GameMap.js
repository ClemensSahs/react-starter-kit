
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-did-mount-set-state */


import React, { PropTypes } from 'react';

import * as THREE from 'three';

import React3 from 'react-three-renderer';

import Resources from './Resources';

import RegionsLayer from './RegionsLayer';

import MoveMap from './Hoc/MoveMap';
import ShowStats from './Hoc/ShowStats';

import MouseInput from './Inputs/MouseInput';


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
    gameId: PropTypes.number.isRequired,
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

    this.sourceRegionList = [
      {
        id: 1,
        resourceId: 'california',
        position: new THREE.Vector3(-300, -100, 1),
        color: 0xf08000,
        rotation: new THREE.Euler(0, 0, 0),
      },
      {
        id: 2,
        resourceId: 'california2',
        position: new THREE.Vector3(0, -100, 1),
        color: 0xf080f0,
        rotation: new THREE.Euler(0, 0, 0),
      },
    ];


    this.regionList = [];
  }

  componentWillMount() {
    console.log(`load gamemap for game id(${this.props.gameId})`);
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
    // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(prevProps, prevState) {
    const width = this.refContainer.offsetWidth;
    if (width !== 0) {
      const height = ((width / 16) * 9);

      // containerResized use this.refContainer
      if (
        this.refContainer &&
        (
          width !== prevState.size.width ||
          height !== prevState.size.height
        )
      ) {
        this.refMouseInput.containerResized();
      }
    }
  }

  _onAnimate = () => {
    this._onAnimateInternal();
  }

  // eslint-disable-next-line class-methods-use-this
  _onAnimateInternal() {
    if (!this.refMouseInput) {
      return;
    }

    if (!this.refMouseInput.isReady()) {
      if (this.refScene && this.refContainer && this.refCamera) {
        this.refMouseInput.ready(this.refScene, this.refContainer, this.refCamera);
        this.refMouseInput.restrictIntersections(this.regionList);
        this.refMouseInput.setActive(false);
      } else {
        console.log('refMouseInput.isReady faild', this.refScene && this.refContainer && this.refCamera);
      }
    }

    if (this.state.mouseInput !== this.refMouseInput) {
      this.setState({
        mouseInput: this.refMouseInput,
      });
    }

    if (this.state.camera !== this.refCamera) {
      this.setState({
        camera: this.refCamera,
      });
    }
  }

  _onClickRegion = (region) => {
    // eslint-disable-next-line no-console
    console.log('show region', this.regionList, region.props.resourceId);
  }

  _onMountedRegionList = (regionList) => {
    this.regionList = regionList;
    console.log('all region are mounted:', regionList);
  }

  render() {
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
          ref={(c) => { this.refMouseInput = c; }}
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
              regionList={this.sourceRegionList}
              onClickRegion={this._onClickRegion}
              onMountedRegionList={this._onMountedRegionList}
            />
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default ShowStats(MoveMap(GameMap));
