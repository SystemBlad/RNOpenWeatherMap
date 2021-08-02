/**
 * @format
 */

import 'react-native';
import React from 'react';
import MainContainer from './MainContainer';

import renderer from 'react-test-renderer';
import {View} from 'react-native';

it('renders correctly', () => {
  renderer.create(
    <MainContainer>
      <View />
    </MainContainer>,
  );
});
