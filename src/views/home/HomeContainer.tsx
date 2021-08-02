import React from 'react';
import {MainContainer} from '../../components/';
import {View} from 'react-native';
import HomeView from './HomeView';

function HomeContainer() {
  return (
    <MainContainer>
      <View>
        <HomeView />
      </View>
    </MainContainer>
  );
}

export default HomeContainer;
