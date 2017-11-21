import test from 'ava';
const {
  createAnimator
} = require('../../lib/animator');
import {
  createMockWindow,
  createMockBrowserWindow
} from '../helpers';

test('createAnimator() returns an object with a unload function', t => {
  const mockBrowserWindow = createMockBrowserWindow({
    isFocused: () => true
  });
  const classList = new Set();
  const animator = createAnimator(createMockWindow(classList), mockBrowserWindow);
  t.true(animator instanceof Object);
  t.true(animator.unload instanceof Function);
});