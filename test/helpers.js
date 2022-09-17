module.exports.createMockWindow = function (classList) {
  classList.remove = classList.delete;
  let focus = true;
  const window = {
    document: {
      documentElement: {
        classList
      },
      hasFocus: () => focus
    },
    config: {
      getConfig: () => ({})
    },
    blur() {
      focus = false;
    },
    focus() {
      focus = true;
    },
    addEventListener(event, cb) {
      switch (event) {
        case 'blur':
          window.blur = () => {
            focus = false;
            cb();
          };

          break;
        case 'focus':
          window.focus = () => {
            focus = true;
            cb();
          };

          break;
        default:
          break;
      }
    },
    setInterval: () => ({})
  };
  return window;
};

