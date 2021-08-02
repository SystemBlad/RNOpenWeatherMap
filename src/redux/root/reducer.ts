import createReducer from '../../config/redux/createReducer';
import * as types from '../../config/redux/types';

const initialState = {
  temperatureUnit: 0,
};

export const rootReducer = createReducer(initialState, {
  [types.UPDATE_TEMPERATURE_UNIT](state: any, action: any) {
    return {...state, userIdLinkWithPIN: action.temperatureUnit};
  },
});
