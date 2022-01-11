/** @module lib/animator */

/** the angle of the border as deg */
let deg = 0;

/** The id of the updateBorderAngle interval */
let intervalId = null;

/**
 * Initializes everything needed to animate the
 * gradient border
 * @param {object} window - the window object
 * @return {function} function to unload animator
 */
module.exports.createAnimator = window => {
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
  window.addEventListener('close', clearUpdateBorderAngleInterval);
  window.addEventListener('blur', clearUpdateBorderAngleInterval);
  window.addEventListener('focus', createUpdateBorderAngleInterval);
  if (window.document.hasFocus()) {
    createUpdateBorderAngleInterval();
  }
  return () => {
    window.removeEventListener('close', clearUpdateBorderAngleInterval);
    window.removeEventListener('blur', clearUpdateBorderAngleInterval);
    window.removeEventListener('focus', createUpdateBorderAngleInterval);
    clearUpdateBorderAngleInterval();
  };
};
