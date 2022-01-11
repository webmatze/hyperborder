const test = require('ava');
const {createMockWindow} = require('./helpers');
const proxyquire = require('proxyquire').noCallThru();

// --- onRendererWindow() ---

test('onRendererWindow() doesn\'t add "blurred" class when the window is initially focused',
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.false(classList.has('blurred'));
  }
);

test('onRendererWindow() adds "blurred" class when the window is not initially focused',
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    const window = createMockWindow(classList);
    window.blur();
    await onRendererWindow(window);

    t.true(classList.has('blurred'));
  }
);

test('onRendererWindow() doesn\'t add "elevated" class when hyper is not opened by admin/root',
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.false(classList.has('elevated'));
  }
);

test('onRendererWindow() adds "elevated" class when hyper is opened by admin/root',
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      'is-elevated': () => Promise.resolve(true)
    });
    const classList = new Set();

    await onRendererWindow(createMockWindow(classList));

    t.true(classList.has('elevated'));
  }
);

test('onRendererWindow() adds "blurred" class when window loses focus',
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    const window = createMockWindow(classList);
    await onRendererWindow(window);
    window.blur();

    t.true(classList.has('blurred'));
  }
);

test('onRendererWindow() removes "blurred" class when window gains focus',
  async t => {
    const {onRendererWindow} = proxyquire('../index', {
      'is-elevated': () => Promise.resolve(false)
    });
    const classList = new Set();

    const window = createMockWindow(classList);
    window.blur();
    await onRendererWindow(window);
    t.true(classList.has('blurred'));
    window.focus();
    t.false(classList.has('blurred'));
  }
);
