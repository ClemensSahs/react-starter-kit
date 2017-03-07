import * as THREE from 'three';


/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

function mathGetAbsWithNegativ(oldValue, newValue) {
  return (Math.abs(oldValue - newValue) * (oldValue > newValue ? -1 : 1));
}


function MoveMap(WrappedComponent) {
  return class extends WrappedComponent {
    constructor(props, context) {
      super(props, context);

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
    }

    componentDidMount() {
      super.componentDidMount();
      const container = this.refContainer;

      container.addEventListener('mousedown', this._onDocumentMouseDown, false);
      container.addEventListener('touchstart', this._onDocumentTouchStart, false);
      document.addEventListener('touchmove', this._onDocumentTouchMove, false);

      console.log('componentDidMount');
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      const container = this.refContainer;

      container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
      container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
      document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
      document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this._onDocumentMouseOut, false);

      console.log('componentWillUnmount');
    }

    _onAnimateInternal(...args) {
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
      super._onAnimateInternal(...args);
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

    render() {
      return super.render();
    }
  };
}

export default MoveMap;
