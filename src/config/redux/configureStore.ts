import {createStore} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducers from '../../redux';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['rootReducer'],
};

//const reducers = combineReducers(rootReducers);
const reducers = persistCombineReducers(config, rootReducers);
const store = createStore(reducers);
let persistor = persistStore(store);
const configureStore = () => {
  return {persistor, store};
};

export default configureStore;
