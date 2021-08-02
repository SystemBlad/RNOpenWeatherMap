import * as types from '../../config/redux/types';

export function updateTemperatureUnit(temperatureUnit: number) {
  return {
    type: types.UPDATE_TEMPERATURE_UNIT,
    temperatureUnit: temperatureUnit,
  };
}
