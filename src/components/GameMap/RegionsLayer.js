/* eslint-disable no-underscore-dangle */

import React, { PropTypes } from 'react';
import * as THREE from 'three';

import Regions from './Regions';

class RegionsLayer extends React.PureComponent {
  static propTypes = {
    onClickRegion: PropTypes.func.isRequired,
    onMountedRegionList: PropTypes.func.isRequired,
    regionList: PropTypes.arrayOf(
      React.PropTypes.shape({
        id: PropTypes.number.isRequired,
        resourceId: PropTypes.string.isRequired,
        color: PropTypes.any.isRequired,
        position: PropTypes.instanceOf(THREE.Vector3).isRequired,
        rotation: PropTypes.instanceOf(THREE.Euler).isRequired,
      }),
    ).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const regionList = [];
    regionList.length = props.regionList.length;
    this.regionList = regionList;
  }

  componentDidMount() {
    const {
      onMountedRegionList,
    } = this.props;

    onMountedRegionList(this.regionList);
  }

  _onCreateRegion = (index, region) => {
    this.regionList[index] = region;
  };

  render() {
    const {
      regionList,
      onClickRegion,
    } = this.props;

    const scale = new THREE.Vector3(1, 1, 1);
    return (<group>

      {regionList.map((region, index) => {
        // eslint-disable-next-line react/jsx-no-bind
        const onCreateRegion = this._onCreateRegion.bind(this, index);
        return (<Regions
          key={region.id}
          resourceId={region.resourceId}
          position={region.position}
          rotation={region.rotation}
          color={region.color}
          scale={scale}
          onClick={onClickRegion}
          onCreate={onCreateRegion}
        />);
      })}
    </group>);
  }
}

export default RegionsLayer;
