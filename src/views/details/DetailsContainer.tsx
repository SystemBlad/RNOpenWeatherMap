import React from 'react';
import {MainContainer} from '../../components/';
import {ScrollView} from 'react-native';
import DetailsView from './DetailsView';
export interface IProps {
  route: any;
}
function DetailsContainer(props: IProps) {
  return (
    <MainContainer>
      <ScrollView keyboardShouldPersistTaps="handled">
        <DetailsView route={props.route} />
      </ScrollView>
    </MainContainer>
  );
}

export default DetailsContainer;
