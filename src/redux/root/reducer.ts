import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/types';
import {TEMPERATURE_UNITS} from '../../utils/enums';

const initialState = {
  temperatureUnit: TEMPERATURE_UNITS.FAHRENHEIT,
};

export const rootReducer = createReducer(initialState, {
  [types.UPDATE_TEMPERATURE_UNIT](state: any, action: any) {
    return {...state, temperatureUnit: action.temperatureUnit};
  },
});
