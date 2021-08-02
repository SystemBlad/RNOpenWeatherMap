import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/types';
import {TEMPERATURE_UNITS} from '../../utils/enums';

const initialState = {
  temperatureUnit: TEMPERATURE_UNITS.FAHRENHEIT,
  SearchedCities: [],
};

export const rootReducer = createReducer(initialState, {
  [types.UPDATE_TEMPERATURE_UNIT](state: any, action: any) {
    return {...state, temperatureUnit: action.temperatureUnit};
  },
  [types.UPDATE_SEARCHED_CITIES](state: any, action: any) {
    console.log(action);
    console.log(state.SearchedCities);
    return {
      ...state,
      SearchedCities: state.SearchedCities.some(
        (city: any) => city.id === action.city.id,
      )
        ? [...state.SearchedCities]
        : [...state.SearchedCities, action.city],
    };
  },
});
