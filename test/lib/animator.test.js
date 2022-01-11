const test = require('ava');
const {createAnimator} = require('../../lib/animator');
const {createMockWindow} = require('../helpers');

test('createAnimator() returns an unload function', t => {
  const classList = new Set();
  const mockWindow = createMockWindow(classList);
  mockWindow.config.getConfig = () => ({
    hyperBorder: {
      animate: {
        duration: 1000
      }
    }
  });
  const animatorUnloadFunction = createAnimator(mockWindow);
  t.true(animatorUnloadFunction instanceof Function);
});
