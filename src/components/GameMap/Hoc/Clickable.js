// import * as THREE from 'three';
import { PropTypes } from 'react';

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */


function Clickable(WrappedComponent) {
  return class extends WrappedComponent {
    static propTypes = Object.assign(
      WrappedComponent.propTypes,
      {
        onClick: PropTypes.func.isRequired,
      },
    );

    componentDidMount() {
      if (!this.props.onClick) {
        console.error('Component has no onClick property', this);
      }
    }
  };
}

export default Clickable;
