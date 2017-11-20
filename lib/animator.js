let deg = 0;
let intervalId = null;

module.exports.createAnimator = (window, browserWindow) => {
  const updateBorderAngle = () => {
    window.document.documentElement.style.setProperty('--border-angle', `${deg}deg`);
    deg = deg > 360 ? 2 : deg + 2;
  };
  const createUpdateBorderAngleInterval = () => {
    if (!intervalId) {
      intervalId = window.setInterval(updateBorderAngle, 100);        
    }
  };
  const clearUpdateBorderAngleInterval = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };
  browserWindow.on('close', clearUpdateBorderAngleInterval);
  browserWindow.on('blur', clearUpdateBorderAngleInterval);
  browserWindow.on('focus', createUpdateBorderAngleInterval);
  if (browserWindow.isFocused()) {
    createUpdateBorderAngleInterval();
  }
  return {
    unload: () => {
      browserWindow.removeListener('close', clearUpdateBorderAngleInterval);
      browserWindow.removeListener('blur', clearUpdateBorderAngleInterval);
      browserWindow.removeListener('focus', createUpdateBorderAngleInterval);
      clearUpdateBorderAngleInterval();
    }
  };
};
