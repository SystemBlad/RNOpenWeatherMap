import * as types from '../../config/redux/types';
import {Icity} from '../../models/data';

export function updateTemperatureUnit(temperatureUnit: number) {
  return {
    type: types.UPDATE_TEMPERATURE_UNIT,
    temperatureUnit: temperatureUnit,
  };
}

export function updateSearchedCities(city: Icity) {
  city.isSearched = true;
  return {
    type: types.UPDATE_SEARCHED_CITIES,
    city: city,
  };
}
