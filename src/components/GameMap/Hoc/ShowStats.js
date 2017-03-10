import Stats from 'stats-js';
import { getDisplayName } from '../../../utils/hoc';

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */


function ShowStats(WrappedComponent) {
  return class extends WrappedComponent {
    static displayName = getDisplayName(WrappedComponent, 'ShowStats');

    componentDidMount() {
      super.componentDidMount();
      this.stats = new Stats();

      const container = this.refContainer;

      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = '0px';

      container.appendChild(this.stats.domElement);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      delete this.stats;
    }

    _onAnimateInternal() {
      super._onAnimateInternal();
      if (this.stats) {
        this.stats.update();
      }
    }
  };
}

export default ShowStats;
