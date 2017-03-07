

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

function lateBind(cb, fixThis) {
  return (...args) => {
    cb.apply(fixThis, ...args);
  };
}

function MoveMap(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    _onAnimateInternal(...args) {
      lateBind(super._onAnimateInternal, this)(...args);
    }

    render() {
      return super.render();
    }
  };
}

export default MoveMap;
