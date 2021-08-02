import {TEMPERATURE_UNITS} from './enums';

export function convertTemperature(kelvin: number, temperatureUnit: number) {
  let returnValue = 0;
  if (temperatureUnit === TEMPERATURE_UNITS.CELSIUS) {
    returnValue = kelvin - 273.15;
  } else {
    returnValue = ((kelvin - 273.15) * 9) / 5 + 32;
  }
  return Math.round((returnValue + Number.EPSILON) * 100) / 100;
}
