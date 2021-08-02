import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export interface IProps {
  children: React.ReactNode;
}

function MainContainer(props: IProps) {
  return <SafeAreaView style={styles.mainContainer} {...props} />;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default MainContainer;
