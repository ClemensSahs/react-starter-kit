import React, { PropTypes } from 'react';
import * as THREE from 'three';

import Regions from './Regions';

class RegionsLayer extends React.Component {
  static propTypes = {
    onClickRegion: PropTypes.func.isRequired,
    regionList: PropTypes.arrayOf(
      React.PropTypes.shape({
        id: PropTypes.number.isRequired,
        resourceId: PropTypes.string.isRequired,
        color: PropTypes.any.isRequired,
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
          z: PropTypes.number.isRequired,
        }).isRequired,
        rotation: PropTypes.instanceOf(THREE.Euler).isRequired,
      }),
    ).isRequired,
  };

  render() {
    const {
      regionList,
      onClickRegion,
    } = this.props;

    const scale = new THREE.Vector3(1, 1, 1);
    return (<group>

      {regionList.map(region => (
        <Regions
          key={region.id}
          resourceId={region.resourceId}
          position={region.position}
          rotation={region.rotation}
          color={region.color}
          scale={scale}
          onClick={onClickRegion}
        />
    ))}
    </group>);
  }
}

export default RegionsLayer;
