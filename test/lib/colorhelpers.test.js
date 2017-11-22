import test from 'ava';
import {oneLine} from 'common-tags';
const {getBorderColors} = require('../../lib/colorhelpers');

test('getBorderColors() returns an array when a single color is given', t => {
  t.true(Array.isArray(getBorderColors('#FFF')));
});

test(oneLine`
  the second color given by getBorderColors() is the same
  as the first when an individual color is given`,
  t => {
    const color = '#FFF';
    const colors = getBorderColors(color);

    t.is(colors[0], color);
    t.is(colors[0], colors[1]);
  }
);

test('getBorderColors() returns a single random color when nothing is provided', t => {
  const colors = getBorderColors();

  t.is(colors[0], colors[1]);
  t.true(colors[0].startsWith('#'));
  t.not(Number(`0x${colors[0].substring(1)}`), NaN);
});
