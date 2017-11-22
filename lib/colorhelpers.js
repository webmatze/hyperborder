/** @module lib/colorhelpers */

/**
 * creates a random color.
 * @return {string} The random color.
 */
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

/**
 * Parses a color and transforms
 * 'random' to a random color
 * @param {string} input - a color or 'random'
 * @return {string} same color as input or random color.
 */
const parseColor = input => input.toLowerCase() === 'random' ? randomColor() : input;

/**
 * Ensures that returned colors are an array
 * @param {string|string[]} colors - single color or array of colors
 * @return {string[]} color array
 */
const ensureColorsArray = colors => [].concat(colors);

/**
 * Doubles a single color to ensure that
 * always at least two colors are returned
 * @param {string[]} colors - array of colors
 * @return {string[]} color array
 */
const ensureAtLeastTwoColorEntries = colors => colors.length < 2 ? colors.concat(colors[0]) : colors;

/**
 * Returns an array of colors to be used by 'linear-gradient'
 * @param {string|string[]} colors - single color or array of colors
 * @return {string[]} color array
 */
module.exports.getBorderColors = (colors = 'random') => {
  colors = ensureColorsArray(colors).map(parseColor);
  return ensureAtLeastTwoColorEntries(colors);
};
