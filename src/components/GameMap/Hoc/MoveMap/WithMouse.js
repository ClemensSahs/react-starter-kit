/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

function mathGetAbsWithNegativ(oldValue, newValue) {
  return (Math.abs(oldValue - newValue) * (oldValue > newValue ? -1 : 1));
}

const defaultMouseOnMouseDown = null;
// const disableKeys = [ modifiers.shift, modifiers.control, modifiers.meta, modifiers.alt];

function MoveMapWithMouse(WrappedComponent) {
  return class extends WrappedComponent {

    constructor(props, context) {
      super(props, context);

      this.targetRotationOnMouseDown = 0;

      this.mouse = null;
      this.mouseOnMouseDown = defaultMouseOnMouseDown;
    }

    componentDidMount() {
      super.componentDidMount();
      const container = this.refContainer;

      container.addEventListener('mousedown', this._onDocumentMouseDown, false);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      const container = this.refContainer;

      container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
      document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
    }

    _onAnimateInternal(...args) {
      if (this.mouseOnMouseDown && this.mouse) {
        this.mouseOnMouseDown = {
          x: this.mouse.x,
          y: this.mouse.y,
        };
      }

      super._onAnimateInternal(...args);
    }

    _onDocumentMouseDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        console.log('mouse move disabled');
        return;
      }
      console.log('mouse move enabled');

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
      console.log('_onDocumentMouseMove');
      const windowHalfX = this.state.size.width / 2;
      const windowHalfY = this.state.size.height / 2;

      this.mouse = {
        x: event.clientX - windowHalfX,
        y: event.clientY - windowHalfY,
      };

      this.groupPositionDiff.x = mathGetAbsWithNegativ(this.mouseOnMouseDown.x, this.mouse.x);
      this.groupPositionDiff.y = mathGetAbsWithNegativ(this.mouseOnMouseDown.y, this.mouse.y) * -1;

      // this.targetRotation = this.targetRotationOnMouseDown +
        // (this.mouseX - this.mouseOnMouseDown.x) * 0.02;
    };

    _onDocumentMouseUp = () => {
      if (this.mouseOnMouseDown) {
        this.mouseOnMouseDown = defaultMouseOnMouseDown;
        this.mouse = defaultMouseOnMouseDown;

        document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
        document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
        document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
      }
    };

    _onDocumentMouseOut = () => {
      if (this.mouseOnMouseDown) {
        this.mouseOnMouseDown = defaultMouseOnMouseDown;
        this.mouse = defaultMouseOnMouseDown;

        document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
        document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
        document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
      }
    };

    render() {
      return super.render();
    }
  };
}

export default MoveMapWithMouse;
