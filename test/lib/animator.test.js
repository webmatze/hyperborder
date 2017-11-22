const test = require('ava');
const {createAnimator} = require('../../lib/animator');
const {createMockWindow, createMockBrowserWindow} = require('../helpers');

test('createAnimator() returns an unload function', t => {
  const mockBrowserWindow = createMockBrowserWindow({
    isFocused: () => true
  });
  const classList = new Set();
  const animatorUnloadFunction = createAnimator(createMockWindow(classList), mockBrowserWindow);
  t.true(animatorUnloadFunction instanceof Function);
});
