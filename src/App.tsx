import React from 'react';
import {Provider} from 'react-redux';

import {ApplicationNavigator} from './navigation';
import configureStore from './config/redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const {persistor, store} = configureStore();

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <ApplicationNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
