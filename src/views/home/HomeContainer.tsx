import React from 'react';
import {MainContainer} from '../../components/';
import {ScrollView} from 'react-native';
import HomeView from './HomeView';

function HomeContainer() {
  return (
    <MainContainer>
      <ScrollView keyboardShouldPersistTaps="handled">
        <HomeView />
      </ScrollView>
    </MainContainer>
  );
}

export default HomeContainer;
