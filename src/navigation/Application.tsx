import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Root';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, View, Text} from 'react-native';
//import HomeView from '../views/home';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function DemoScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{'Under Construction'}</Text>
    </View>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode={'none'}>
      <MainStack.Screen name="HomeScreen" component={DemoScreen} />
      <MainStack.Screen name="DetailsScreen" component={DemoScreen} />
    </MainStack.Navigator>
  );
}

function ApplicationNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
