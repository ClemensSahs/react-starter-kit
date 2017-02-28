import React from 'react';
import Regions from './Regions';

class RegionsLayer extends React.Component {

  render() {
    return (<group>
      <Regions
        resourceId="california"
        x={-300}
        y={-100}
        z={1}
        color={0xf08000}
        rx={0}
        ry={0}
        rz={0}
        s={1}
      />
      <Regions
        resourceId="california2"
        x={0}
        y={-100}
        z={0}
        color={0xf080f0}
        rx={0}
        ry={0}
        rz={0}
        s={1}
      />
    </group>);
  }
}

export default RegionsLayer;
