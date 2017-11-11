import test from 'ava';
import {oneLineTrim} from 'common-tags';
const proxyquire = require('proxyquire').noCallThru();

// --- getBorderColors() ---

test('getBorderColors() returns an array when a single color is given', t => {
  const {getBorderColors} = proxyquire('../index', {
    electron: {}
  });

  t.true(Array.isArray(getBorderColors('#FFF')));
});

test(oneLineTrim`
  the second color given by getBorderColors() is the same
  as the first when an individual color is given`,
  t => {
    const {getBorderColors} = proxyquire('../index', {
      electron: {}
    });
    const color = '#FFF';
    const colors = getBorderColors(color);

    t.is(colors[0], color);
    t.is(colors[0], colors[1]);
  }
);

test('getBorderColors() returns a single random color when nothing is provided', t => {
  const {getBorderColors} = proxyquire('../index', {
    electron: {}
  });
  const colors = getBorderColors();

  t.is(colors[0], colors[1]);
  t.true(colors[0].startsWith('#'));
  t.not(+`0x${colors[0].substring(1)}`, NaN);
});

// --- decorateConfig() ---

test(oneLineTrim`
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

test(oneLineTrim`
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

test(oneLineTrim`
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

test(oneLineTrim`
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

test(oneLineTrim`
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

// --- Helpers ---
function createMockWindow(classList) {
  classList.remove = classList.delete;

  return {
    document: {
      documentElement: {
        classList
      }
    }
  };
}

function createMockBrowserWindow(browserWindow) {
  const newBrowserWindow = Object.assign({
    isFocused: () => {},
    on: (event, cb) => {
      switch(event) {
        case 'blur':
          newBrowserWindow.blur = cb;
          break;
        case 'focus':
          newBrowserWindow.focus = cb;
          break;
      }
    }
  }, browserWindow);

  return newBrowserWindow;
}

function createMockElectron(browserWindow) {
  browserWindow = createMockBrowserWindow(browserWindow);

  return {
    remote: {
      getCurrentWindow: () => browserWindow
    }
  };
}
