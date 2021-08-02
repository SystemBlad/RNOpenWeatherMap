import React from 'react';
import {MainContainer} from '../../components/';
import {ScrollView} from 'react-native';
import APPStyles from '../../theme/styles';
import HomeView from './HomeView';

function PwsUpdateContainer() {
  return (
    <MainContainer>
      <ScrollView
        contentContainerStyle={APPStyles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <HomeView />
      </ScrollView>
    </MainContainer>
  );
}

export default PwsUpdateContainer;
