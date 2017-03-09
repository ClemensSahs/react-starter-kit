import keydown, { Keys } from 'react-keydown';
import { getDisplayName } from '../../../../utils/hoc';

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

function MoveMapWithKeyboard(WrappedComponent) {
  return class extends WrappedComponent {
    static displayName = getDisplayName(WrappedComponent, 'MoveMapWithKeyboard');
    @keydown(Keys.up, Keys.down, Keys.left, Keys.right)
    moveMap(event) {
      event.preventDefault();

      switch (event.which) {
        case Keys.up:
          this.groupPositionDiff.y = -20;
          break;
        case Keys.down:
          this.groupPositionDiff.y = 20;

          break;
        case Keys.left:
          this.groupPositionDiff.x = 20;

          break;
        case Keys.right:
          this.groupPositionDiff.x = -20;

          break;

        default:

      }
    }
  };
}

export default MoveMapWithKeyboard;
