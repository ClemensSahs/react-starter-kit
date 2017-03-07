
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

function mathGetAbsWithNegativ(oldValue, newValue) {
  return (Math.abs(oldValue - newValue) * (oldValue > newValue ? -1 : 1));
}

function MoveMapWithMouse(WrappedComponent) {
  return class extends WrappedComponent {

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
      this.mouseOnMouseDown = {
        x: this.state.groupPosition.x + this.groupPositionDiff.x,
        y: this.state.groupPosition.y + this.groupPositionDiff.y,
      };

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

export default MoveMapWithMouse;
