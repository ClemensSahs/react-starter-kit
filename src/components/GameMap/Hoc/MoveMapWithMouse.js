
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

function mathGetAbsWithNegativ(oldValue, newValue) {
  return (Math.abs(oldValue - newValue) * (oldValue > newValue ? -1 : 1));
}

const defaultMouseOnMouseDown = null;

function MoveMapWithMouse(WrappedComponent) {
  return class extends WrappedComponent {

    constructor(props, context) {
      super(props, context);

      this.targetRotationOnMouseDown = 0;

      this.mouseX = 0;
      this.mouseOnMouseDown = defaultMouseOnMouseDown;
    }

    componentDidMount() {
      super.componentDidMount();
      const container = this.refContainer;

      container.addEventListener('mousedown', this._onDocumentMouseDown, false);

      console.log('componentDidMount');
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      const container = this.refContainer;

      container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
      document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this._onDocumentMouseOut, false);

      console.log('componentWillUnmount');
    }

    _onAnimateInternal(...args) {
      if (this.mouseOnMouseDown) {
        // this.mouseOnMouseDown = {
        //   x: this.state.groupPosition.x + this.groupPositionDiff.x,
        //   y: this.state.groupPosition.y + this.groupPositionDiff.y,
        // };

        console.log('_onAnimateInternal', this.mouseOnMouseDown);
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
      if (!this.mouseOnMouseDown) {
        return;
      }
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
      this.mouseOnMouseDown = defaultMouseOnMouseDown;

      document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
    };

    _onDocumentMouseOut = () => {
      this.mouseOnMouseDown = defaultMouseOnMouseDown;

      document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
    };

    render() {
      return super.render();
    }
  };
}

export default MoveMapWithMouse;
