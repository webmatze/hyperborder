const test = require('ava');
const {oneLine} = require('common-tags');
const {createMockElectron, createMockWindow, createMockBrowserWindow} = require('./helpers');
const proxyquire = require('proxyquire').noCallThru();

// --- decorateConfig() ---

test(oneLine`
  decorateConfig() doesn't throw when there isn't
  a hyperBorder config section`,
  t => {
    const {decorateConfig} = proxyquire('../index', {
      electron: {}
    });
    t.notThrows(() => decorateConfig({}));
  }
);

// --- onRendererWindow() ---

test(oneLine`
  onRendererWindow() doesn't add "blurred" class when the window
  is initially focused`,
  async t => {
    const mockBrowserWindow = {
      isFocused: () => true
    };
    const {onRendererWindow} = proxyquire('../index', {
      electron: createMockElectron(mockBrowserWindow),
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.false(classList.has('blurred'));
  }
);

test(oneLine`
  onRendererWindow() adds "blurred" class when the window
  is not initially focused`,
  async t => {
    const mockBrowserWindow = {
      isFocused: () => false
    };
    const {onRendererWindow} = proxyquire('../index', {
      electron: createMockElectron(mockBrowserWindow),
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.true(classList.has('blurred'));
  }
);

test(oneLine`
  onRendererWindow() doesn't add "elevated" class when hyper is
  not opened by admin/root`,
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      electron: createMockElectron(),
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.false(classList.has('elevated'));
  }
);

test(oneLine`
  onRendererWindow() adds "elevated" class when hyper is
  opened by admin/root`,
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      electron: createMockElectron(),
      'is-elevated': () => Promise.resolve(true)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.true(classList.has('elevated'));
  }
);

test(
  'onRendererWindow() adds "blurred" class when window loses focus',
  async t => {
    const mockBrowserWindow = createMockBrowserWindow({
      isFocused: () => true
    });
    const {onRendererWindow} = proxyquire('../index', {
      electron: createMockElectron(mockBrowserWindow),
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));
    mockBrowserWindow.blur();

    t.true(classList.has('blurred'));
  }
);

test(
  'onRendererWindow() removes "blurred" class when window gains focus',
  async t => {
    const mockBrowserWindow = createMockBrowserWindow({
      isFocused: () => false
    });
    const {onRendererWindow} = proxyquire('../index', {
      electron: createMockElectron(mockBrowserWindow),
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));
    t.true(classList.has('blurred'));
    mockBrowserWindow.focus();
    t.false(classList.has('blurred'));
  }
);
