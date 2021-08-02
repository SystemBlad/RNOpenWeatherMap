import * as ActionTypes from '../../config/redux/types';
import * as rootReducer from './reducer';
import {TEMPERATURE_UNITS} from '../../utils/enums';

describe('Reducers::rootReducer', () => {
  it('should handle UPDATE_TEMPERATURE_UNIT', () => {
    const appState = {
      temperatureUnit: TEMPERATURE_UNITS.FAHRENHEIT,
    };
    const action = {
      type: ActionTypes.UPDATE_TEMPERATURE_UNIT,
      temperatureUnit: TEMPERATURE_UNITS.CELSIUS,
    };
    const expected = {
      temperatureUnit: TEMPERATURE_UNITS.CELSIUS,
    };

    expect(rootReducer.rootReducer(appState, action)).toEqual(expected);
  });
});
