import {convertTemperature} from './helpers';
import {TEMPERATURE_UNITS} from './enums';

test('convertTemperature', () => {
  expect(convertTemperature(300, TEMPERATURE_UNITS.CELSIUS)).toBe(26.85);
  expect(convertTemperature(300, TEMPERATURE_UNITS.FAHRENHEIT)).toBe(80.33);
});
