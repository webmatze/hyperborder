module.exports.createMockWindow = function (classList) {
  classList.remove = classList.delete;
  return {
    document: {
      documentElement: {
        classList
      }
    },
    config: {
      getConfig: () => ({})
    },
    setInterval: () => ({})
  };
};

const createMockBrowserWindow = function (browserWindow) {
  const newBrowserWindow = Object.assign({
    isFocused: () => {},
    on: (event, cb) => {
      switch (event) {
        case 'blur':
          newBrowserWindow.blur = cb;
          break;
        case 'focus':
          newBrowserWindow.focus = cb;
          break;
        default:
          break;
      }
    }
  }, browserWindow);

  return newBrowserWindow;
};
module.exports.createMockBrowserWindow = createMockBrowserWindow;

module.exports.createMockElectron = function (browserWindow) {
  browserWindow = createMockBrowserWindow(browserWindow);
  return {
    remote: {
      getCurrentWindow: () => browserWindow
    }
  };
};
