/** @module lib/animator */

/** the angle of the border as deg */
let deg = 0;

/** The id of the updateBorderAngle interval */
let intervalId = null;

/**
 * Initializes everything needed to animate the
 * gradient border
 * @param {object} window - the window object
 * @param {object} browserWindow - the browserWindow object
 * @return {function} function to unload animator
 */
module.exports.createAnimator = (window, browserWindow) => {
  const config = window.config.getConfig();
  const duration = config.hyperBorder.animate.duration || 18000;
  const intervalFrequency = 100;
  const degDelta = 360 / (duration / intervalFrequency);

  const updateBorderAngle = () => {
    window.document.documentElement.style.setProperty('--border-angle', `${deg}deg`);
    deg = deg >= 360 ? degDelta : deg + degDelta;
  };
  const createUpdateBorderAngleInterval = () => {
    if (!intervalId) {
      intervalId = window.setInterval(updateBorderAngle, intervalFrequency);
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
  return () => {
    browserWindow.removeListener('close', clearUpdateBorderAngleInterval);
    browserWindow.removeListener('blur', clearUpdateBorderAngleInterval);
    browserWindow.removeListener('focus', createUpdateBorderAngleInterval);
    clearUpdateBorderAngleInterval();
  };
};
