import * as THREE from 'three';


import MoveMapWithMouse from './WithMouse';
import MoveMapWithKeyboard from './WithKeyboard';

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */


function MoveMap(WrappedComponent) {
  return MoveMapWithMouse(MoveMapWithKeyboard(class extends WrappedComponent {

    constructor(props, context) {
      super(props, context);

      this.targetRotation = 0;
      this.groupPositionDiff = {
        x: 0,
        y: 0,
      };
    }

    _onAnimateInternal(...args) {
      if (
        Math.abs(this.groupPositionDiff.x) > 0.000001 ||
        Math.abs(this.groupPositionDiff.y) > 0.000001
      ) {
        this.setState({
          groupPosition: new THREE.Vector3(
             this.state.groupPosition.x + this.groupPositionDiff.x,
             this.state.groupPosition.y + this.groupPositionDiff.y,
             0,
           ),
        });

        this.groupPositionDiff = {
          x: 0,
          y: 0,
        };
      }
      super._onAnimateInternal(...args);
    }

    render() {
      return super.render();
    }
  }));
}

export default MoveMap;
